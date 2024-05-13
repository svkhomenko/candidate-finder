import { useState } from 'react';
import VacancyResumeSearch from '~/components/VacancyResumeSearch/VacancyResumeSearch';
import VacancyResumeFilters from '~/components/VacancyResumeSearch/VacancyResumeFilters';
import ResumesList from './ResumesList';
import type { Contract } from '~/types/resume-vacancy-enums';

const ResumesPage = () => {
  const [q, setQ] = useState<string>('');
  const [contract, setContract] = useState<Contract[]>([]);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);
  const [experienceMin, setExperienceMin] = useState<number | null>(null);
  const [experienceMax, setExperienceMax] = useState<number | null>(null);

  return (
    <>
      <VacancyResumeSearch setQ={setQ} />
      <VacancyResumeFilters
        setContract={setContract}
        setSalaryMin={setSalaryMin}
        setSalaryMax={setSalaryMax}
        setExperienceMin={setExperienceMin}
        setExperienceMax={setExperienceMax}
      />
      <ResumesList
        q={q}
        contract={contract}
        salaryMin={salaryMin}
        salaryMax={salaryMax}
        experienceMin={experienceMin}
        experienceMax={experienceMax}
      />
    </>
  );
};

export default ResumesPage;
