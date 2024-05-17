import { Education, Contract, Language, Level } from './resume-vacancy-enums';
import { RecomendedResume } from './resume';

export type Vacancy = {
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

export type VacanciesResponse = {
  vacancies: Vacancy[];
  totalCount: number;
};

export type VacanciesRecommendationResponse = {
  recomendedResumes: RecomendedResume[];
  totalCount: number;
};

export type VacanciesParam = {
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

export type VacancyLanguageLevel = {
  language: Language;
  vacancyId: number;
  level: Level;
};
