import { useState } from 'react';
import VacancyResumeSearch from '~/components/VacancyResumeSearch/VacancyResumeSearch';
import VacancyResumeFilters from '~/components/VacancyResumeSearch/VacancyResumeFilters';
import ResumesList from './ResumesList';
import type { Contract, Education } from '~/types/resume-vacancy-enums';

const ResumesPage = () => {
  const [q, setQ] = useState<string>('');
  const [contract, setContract] = useState<Contract[]>([]);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);
  const [experienceMin, setExperienceMin] = useState<number | null>(null);
  const [experienceMax, setExperienceMax] = useState<number | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [education, setEducation] = useState<Education[]>([]);

  return (
    <>
      <VacancyResumeSearch setQ={setQ} />
      <VacancyResumeFilters
        setContract={setContract}
        setSalaryMin={setSalaryMin}
        setSalaryMax={setSalaryMax}
        setExperienceMin={setExperienceMin}
        setExperienceMax={setExperienceMax}
        setOnline={setOnline}
        setEducation={setEducation}
      />
      <ResumesList
        q={q}
        contract={contract}
        salaryMin={salaryMin}
        salaryMax={salaryMax}
        experienceMin={experienceMin}
        experienceMax={experienceMax}
        online={online}
        education={education}
      />
    </>
  );
};

export default ResumesPage;
