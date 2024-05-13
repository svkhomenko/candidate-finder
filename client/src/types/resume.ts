import { Education, Contract, Language, Level } from './resume-vacancy-enums';

export type Resume = {
  id: number;
  title: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  experience: number;
  education: Education;
  place_id: string;
  address: string;
  online: boolean;
  contract: Contract;
  userId: number;
};

export type ResumesResponse = {
  resumes: Resume[];
  totalCount: number;
};

export type ResumesParam = {
  _start: number;
  _end: number;
  userId?: number;
  q?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceMin?: number;
  experienceMax?: number;
  education?: Education[];
  place_id?: string;
  online?: boolean;
  contract?: Contract[];
};

export type ResumeLanguageLevel = {
  language: Language;
  resumeId: number;
  level: Level;
};
