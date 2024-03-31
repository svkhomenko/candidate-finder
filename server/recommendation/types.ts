export type IDocument = {
  id: number;
  description: string;
  type: 'resume' | 'vacancy';
};

export type IProcessedDocument = {
  id: number;
  textArr: string[];
  type: 'resume' | 'vacancy';
  index: number;
  recommendatedResumes?: Array<IRecommendatedResume>;
};

export type IRecommendatedResume = {
  id: number;
  ratingScore: number;
};
