import ResumeService from '../services/resume';
import VacancyService from '../services/vacancy';
import textProcessing, { tokeniseAndStemmed, getTermDocumentMatrix } from './text-processing';
import ClientError from '../types/error';
import { RESUME, VACANCY } from '../consts/const';
import { IDocument, IProcessedDocument, IDocumentType } from './types';
import { IKmeanResult } from './clusterization/k-mean';
import cosineSimilarity from './clusterization/cosine-similarity';
import { Resume, Vacancy } from '@prisma/client';
import silhouette from './silhouette/silhouette';

async function getAllDocuments(): Promise<Array<IDocument>> {
  let resumes = await ResumeService.getAllDescriptions();
  let typedResumes: Array<IDocument> = resumes.map((resume) => ({
    ...resume,
    type: RESUME,
  }));

  let vacancies = await VacancyService.getAllDescriptions();
  let typedVacancies: Array<IDocument> = vacancies.map((vacancy) => ({
    ...vacancy,
    type: VACANCY,
  }));

  return [...typedResumes, ...typedVacancies];
}

class Recommendations {
  documents: Array<IProcessedDocument>;
  termDocumentMatrix: Array<Array<number>>;
  kmeansResult: IKmeanResult;

  constructor() {
    this.initRecommendation();
  }

  async initRecommendation() {
    let docs = await getAllDocuments();
    let result = textProcessing(docs);
    this.documents = result.documents;
    this.termDocumentMatrix = result.termDocumentMatrix;
    this.kmeansResult = silhouette(this.termDocumentMatrix);
  }

  getRecommendatedResumesDocuments(vacancyIndex: number) {
    let clusterIndex = this.kmeansResult.clusterIndexes[vacancyIndex];

    let indexesFromCluster = [];
    for (let indexFromC = 0; indexFromC < this.kmeansResult.clusterIndexes.length; indexFromC++) {
      if (this.kmeansResult.clusterIndexes[indexFromC] === clusterIndex) {
        indexesFromCluster.push(indexFromC);
      }
    }

    let resumesDocuments = this.documents.filter(
      (document, index) => indexesFromCluster.includes(index) && document.type === RESUME,
    );

    return resumesDocuments;
  }

  countRatingScore(
    vacancy: Vacancy,
    vacancyIndex: number,
    resumesDocuments: Array<IProcessedDocument>,
    resume: Resume,
  ) {
    const vectorVacancy = this.termDocumentMatrix[vacancyIndex];
    // const resumeDocument = resumesDocuments.find((document) => document.id === resume.id);
    const resumeDocumentIndex = this.documents.findIndex(
      (document) => document.id === resume.id && document.type === RESUME,
    );
    const vectorResume = this.termDocumentMatrix[resumeDocumentIndex];

    const cosSimilarity = 1 - cosineSimilarity(vectorVacancy, vectorResume);

    return cosSimilarity;
  }

  async getRecommendatedResumes(vacancyId: number) {
    let vacancyIndex = this.documents.findIndex(
      (document) => document.id === vacancyId && document.type === VACANCY,
    );
    if (vacancyIndex === -1) {
      throw new ClientError(
        `No such vacancy in recommendation found or provided description is not full enought to find recommendation`,
        404,
      );
    }

    if (this.documents[vacancyIndex].recommendatedResumes) {
      return this.documents[vacancyIndex].recommendatedResumes;
    }

    const vacancy = await VacancyService.findOneOrThrow(this.documents[vacancyIndex].id);

    const resumesDocuments = this.getRecommendatedResumesDocuments(vacancyIndex);
    const resumesIds = resumesDocuments.map((document) => document.id);
    const resumes = await ResumeService.getAllResumesById(resumesIds);

    const recommendatedResumes = resumes.map((resume) => {
      const ratingScore = this.countRatingScore(vacancy, vacancyIndex, resumesDocuments, resume);
      return {
        id: resume.id,
        ratingScore: ratingScore,
        badges: [],
      };
    });

    recommendatedResumes.sort(function (resumeA, resumeB) {
      return resumeB.ratingScore - resumeA.ratingScore;
    });

    this.documents[vacancyIndex].recommendatedResumes = recommendatedResumes;
    return recommendatedResumes;
  }

  handleCreate(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.map((doc) => {
      doc.recommendatedResumes = undefined;
      return doc;
    });

    docs.push({
      id: document.id,
      textArr: tokeniseAndStemmed(document.description),
      type: documentType,
    });

    this.updateClassFields(docs);
  }

  handleUpdate(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.map((doc) => {
      doc.recommendatedResumes = undefined;
      if (doc.id === document.id && doc.type === documentType) {
        doc.textArr = tokeniseAndStemmed(document.description);
      }
      return doc;
    });

    this.updateClassFields(docs);
  }

  handleUpdateWithoutChangingDesc() {
    this.documents = this.documents.map((doc) => {
      doc.recommendatedResumes = undefined;
      return doc;
    });
  }

  handleDelete(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.filter(
      (doc) => !(doc.id === document.id && doc.type === documentType),
    );

    docs = docs.map((doc) => {
      doc.recommendatedResumes = undefined;
      return doc;
    });

    this.updateClassFields(docs);
  }

  updateClassFields(docs: Array<IProcessedDocument>) {
    let result = getTermDocumentMatrix(docs);
    this.documents = result.documents;
    this.termDocumentMatrix = result.termDocumentMatrix;
    this.kmeansResult = silhouette(this.termDocumentMatrix);
  }
}

const recommendations = new Recommendations();

export default recommendations;
