export type Education = 'бакалавр' | 'магістр';
export type Contract = 'повна' | 'неповна';
export type Vacancy = {
  id: number;
  title: string;
  description: string;
  salary: number;
  experience: number;
  education: Education;
  location: string;
  contract: Contract;
};
