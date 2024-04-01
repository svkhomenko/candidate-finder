export type IDocumentType = 'resume' | 'vacancy';

export type IDocument = {
  id: number;
  description: string;
  type: IDocumentType;
};

export type IProcessedDocument = {
  id: number;
  textArr: string[];
  type: IDocumentType;
  index: number;
  recommendatedResumes?: Array<IRecommendatedResume>;
};

export type IRecommendatedResume = {
  id: number;
  ratingScore: number;
};
