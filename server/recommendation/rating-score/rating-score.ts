import {
  Resume,
  ResumeLanguageLevel,
  Vacancy,
  VacancyLanguageLevel,
  Education,
  Contract,
} from '@prisma/client';
import weightingCoefficients from './weighting-coefficients';
import { educationTranslation, levelTranslation, contractTranslation } from './helpers';
import getBadges from './badges';

function getSalaryScore(salaryMaxVacancy: number, salaryMinResume: number) {
  return salaryMaxVacancy >= salaryMinResume ? 1 : 0;
}

function getExperienceScore(experienceVacancy: number, experienceResume: number) {
  return experienceVacancy <= experienceResume ? 1 : 0;
}

function getEducationScore(educationVacancy: Education, educationResume: Education) {
  return educationTranslation[educationVacancy] <= educationTranslation[educationResume] ? 1 : 0;
}

function getLanguagesScore(
  languagesVacancy: VacancyLanguageLevel[],
  languagesResume: ResumeLanguageLevel[],
) {
  let sum = 0;
  let commonLanguages = [];

  languagesVacancy.forEach((langLevelVacancy) => {
    let langLevelResume = languagesResume.find((ll) => ll.language === langLevelVacancy.language);
    if (
      langLevelResume &&
      levelTranslation[langLevelVacancy.level] <= levelTranslation[langLevelResume.level]
    ) {
      sum += 1;
      commonLanguages.push(langLevelResume.language);
    }
  });

  return {
    languagesScore: languagesVacancy.length ? sum / languagesVacancy.length : 1,
    commonLanguages,
  };
}

function getContractScore(contractVacancy: Contract, contractResume: Contract) {
  return contractTranslation[contractVacancy].includes(contractResume) ? 1 : 0;
}

export default function getRatingScoreAndBadges(
  vacancy: Vacancy & { vacancyLanguageLevels: VacancyLanguageLevel[] },
  resume: Resume & { resumeLanguageLevels: ResumeLanguageLevel[] },
  cosSimilarity: number,
) {
  let cosSimilarityScore = cosSimilarity * weightingCoefficients.COS_SIMILARITY;
  let salaryScore =
    weightingCoefficients.SALARY * getSalaryScore(vacancy.salaryMax, resume.salaryMin);
  let experienceScore =
    weightingCoefficients.EXPERIENCE * getExperienceScore(vacancy.experience, resume.experience);
  let educationScore =
    weightingCoefficients.EDUCATION * getEducationScore(vacancy.education, resume.education);

  let languagesResult = getLanguagesScore(
    vacancy.vacancyLanguageLevels,
    resume.resumeLanguageLevels,
  );
  let languagesScore = weightingCoefficients.LANGUAGES * languagesResult.languagesScore;

  let contractScore =
    weightingCoefficients.CONTRACT * getContractScore(vacancy.contract, resume.contract);

  const ratingScore =
    (cosSimilarityScore +
      salaryScore +
      experienceScore +
      educationScore +
      languagesScore +
      contractScore) /
    weightingCoefficients.SUM;

  return {
    ratingScore,
    badges: getBadges(resume, {
      cosSimilarity,
      salaryScore,
      experienceScore,
      educationScore,
      commonLanguages: languagesResult.commonLanguages,
      contractScore,
    }),
  };
}
