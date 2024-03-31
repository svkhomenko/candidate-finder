import ResumeService from '../services/resume';
import VacancyService from '../services/vacancy';
import textProcessing from './text-processing';
import kmeans from './clusterization/k-mean';
import ClientError from '../types/error';
import { RESUME, VACANCY } from '../consts/const';
import { IDocument, IProcessedDocument } from './types';
import { IKmeanResult } from './clusterization/k-mean';

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

  getRecommendatedResumesIds(vacancyId: number) {
    let i = this.documents.findIndex(
      (document) => document.id === vacancyId && document.type === VACANCY,
    );
    if (i === -1) {
      throw new ClientError(`No such vacancy in recommendation found`, 404);
    }
    if (this.documents[i].index === -1) {
      throw new ClientError(`Provide full description to find recommendation`, 400);
    }

    let clusterIndex = this.kmeansResult.clusterIndexes[this.documents[i].index];

    let indexesFromCluster = [];
    for (let indexFromC = 0; indexFromC < this.kmeansResult.clusterIndexes.length; indexFromC++) {
      if (this.kmeansResult.clusterIndexes[indexFromC] === clusterIndex) {
        indexesFromCluster.push(indexFromC);
      }
    }

    let resumesDocuments = this.documents.filter(
      (document) => indexesFromCluster.includes(document.index) && document.type === RESUME,
    );

    return resumesDocuments.map((document) => document.id);
  }
}

const recommendations = new Recommendations();

export default recommendations;
