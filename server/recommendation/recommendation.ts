import ResumeService from '../services/resume';
import VacancyService from '../services/vacancy';
import textProcessing, { tokeniseAndStemmed, getTermDocumentMatrix } from './text-processing';
import kmeans from './clusterization/k-mean';
import ClientError from '../types/error';
import { RESUME, VACANCY } from '../consts/const';
import { IDocument, IProcessedDocument, IRecommendatedResume, IDocumentType } from './types';
import { IKmeanResult } from './clusterization/k-mean';
import cosineSimilarity from './clusterization/cosine-similarity';
import { Resume, Vacancy } from '@prisma/client';

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
  k = 2;

  constructor() {
    this.initRecommendation();
  }

  async initRecommendation() {
    let docs = await getAllDocuments();
    let result = textProcessing(docs);
    this.documents = result.documents;
    this.termDocumentMatrix = result.termDocumentMatrix;
    this.kmeansResult = kmeans(this.termDocumentMatrix, this.k);
  }

  getRecommendatedResumesDocuments(vacancyIndex: number) {
    let clusterIndex = this.kmeansResult.clusterIndexes[this.documents[vacancyIndex].index];

    let indexesFromCluster = [];
    for (let indexFromC = 0; indexFromC < this.kmeansResult.clusterIndexes.length; indexFromC++) {
      if (this.kmeansResult.clusterIndexes[indexFromC] === clusterIndex) {
        indexesFromCluster.push(indexFromC);
      }
    }

    let resumesDocuments = this.documents.filter(
      (document) => indexesFromCluster.includes(document.index) && document.type === RESUME,
    );

    return resumesDocuments;
  }

  countRatingScore(
    vacancy: Vacancy,
    vacancyIndex: number,
    resumesDocuments: Array<IProcessedDocument>,
    resume: Resume,
  ) {
    const vectorVacancy = this.termDocumentMatrix[this.documents[vacancyIndex].index];
    const resumeIndex = resumesDocuments.findIndex((document) => document.id === resume.id);
    const vectorResume = this.termDocumentMatrix[this.documents[resumeIndex].index];

    const cosSimilarity = 1 - cosineSimilarity(vectorVacancy, vectorResume);

    return cosSimilarity;
  }

  async getRecommendatedResumes(vacancyId: number) {
    let vacancyIndex = this.documents.findIndex(
      (document) => document.id === vacancyId && document.type === VACANCY,
    );
    if (vacancyIndex === -1) {
      throw new ClientError(`No such vacancy in recommendation found`, 404);
    }
    if (this.documents[vacancyIndex].index === -1) {
      throw new ClientError(`Provide full description to find recommendation`, 400);
    }

    if (this.documents[vacancyIndex].recommendatedResumes) {
      return this.documents[vacancyIndex].recommendatedResumes;
    }

    const vacancy = await VacancyService.findOneOrThrow(this.documents[vacancyIndex].id);

    const resumesDocuments = this.getRecommendatedResumesDocuments(vacancyIndex);
    const resumesIds = resumesDocuments.map((document) => document.id);
    const resumes = await ResumeService.getAllResumesById(resumesIds);

    const recommendatedResumes: Array<IRecommendatedResume> = [];

    for (let resume of resumes) {
      const ratingScore = this.countRatingScore(vacancy, vacancyIndex, resumesDocuments, resume);
      recommendatedResumes.push({
        id: resume.id,
        ratingScore: ratingScore,
      });
    }

    recommendatedResumes.sort(function (resumeA, resumeB) {
      return resumeA.ratingScore - resumeB.ratingScore;
    });

    this.documents[vacancyIndex].recommendatedResumes = recommendatedResumes;
    return recommendatedResumes;
  }

  handleCreate(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.map((doc, index) => {
      doc.recommendatedResumes = undefined;
      doc.index = index;
      return doc;
    });

    docs.push({
      id: document.id,
      textArr: tokeniseAndStemmed(document.description),
      type: documentType,
      index: docs.length,
    });

    this.updateClassFields(docs);
  }

  handleUpdate(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.map((doc, index) => {
      doc.recommendatedResumes = undefined;
      doc.index = index;
      if (doc.id === document.id && doc.type === documentType) {
        doc.textArr = tokeniseAndStemmed(document.description);
      }
      return doc;
    });

    this.updateClassFields(docs);
  }

  handleDelete(document: Resume | Vacancy, documentType: IDocumentType) {
    let docs = this.documents.filter(
      (doc) => !(doc.id === document.id && doc.type === documentType),
    );

    docs = docs.map((doc, index) => {
      doc.recommendatedResumes = undefined;
      doc.index = index;
      return doc;
    });

    this.updateClassFields(docs);
  }

  updateClassFields(docs: Array<IProcessedDocument>) {
    let result = getTermDocumentMatrix(docs);
    this.documents = result.documents;
    this.termDocumentMatrix = result.termDocumentMatrix;
    this.kmeansResult = kmeans(this.termDocumentMatrix, this.k);
  }
}

const recommendations = new Recommendations();

export default recommendations;
