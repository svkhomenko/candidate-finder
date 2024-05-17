import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import VacancyService from '../services/vacancy';
import VacancyLanguageLevelService from '../services/vacancy-language-level';
import recommendations from '../recommendation/recommendation';
import { VACANCY } from '../consts/const';
import { User, Language } from '@prisma/client';
import { getPageOptions } from '../utils/query-options';

const vacancy = prisma.vacancy;
const resume = prisma.resume;
const vacancyLanguageLevel = prisma.vacancyLanguageLevel;

const getVacancies = async (req: Request, res: Response) => {
  const where = VacancyService.getWhereOptions(req.query);

  const [count, vacancies] = await prisma.$transaction([
    vacancy.count({ where }),
    vacancy.findMany({
      where,
      ...getPageOptions(req.query),
    }),
  ]);

  res.header('X-Total-Count', `${count}`).json(vacancies);
};

const getVacancyById = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);

  const found = await VacancyService.findOneOrThrow(vacancyId);

  res.status(200).json(found);
};

const getVacancyRecommendation = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);

  const recommendatedResumes = await recommendations.getRecommendatedResumes(vacancyId);
  const pagination = getPageOptions(req.query);

  const curResumesIds = recommendatedResumes
    .slice(pagination.skip, pagination.skip + pagination.take)
    .map((recResume) => recResume.id);

  const resumes = await resume.findMany({
    where: {
      id: {
        in: curResumesIds,
      },
    },
  });

  const result = resumes.map((r) => {
    let recommendatedResume = recommendatedResumes.find((recRes) => recRes.id === r.id);
    return {
      ...r,
      ratingScore: recommendatedResume.ratingScore,
      badges: recommendatedResume.badges,
    };
  });

  result.sort(function (resumeA, resumeB) {
    return resumeB.ratingScore - resumeA.ratingScore;
  });

  res.header('X-Total-Count', `${recommendatedResumes.length}`).json(result);
};

const createVacancy = async (req: Request, res: Response) => {
  const data = req.body;
  const { id: userId } = req.user as User;

  const newVacancy = await vacancy.create({
    data: { ...data, userId },
  });

  recommendations.handleCreate(newVacancy, VACANCY);

  res.status(201).json(newVacancy);
};

const updateVacancy = async (req: Request, res: Response) => {
  const data = req.body;
  const vacancyId = Number(req.params.id);

  const found = await VacancyService.findOneOrThrow(vacancyId);

  const updatedVacancy = await vacancy.update({
    where: { id: vacancyId },
    data,
  });

  if (data.description && data.description !== found.description) {
    recommendations.handleUpdate(updatedVacancy, VACANCY);
  } else {
    recommendations.handleUpdateWithoutChangingDesc();
  }

  res.status(201).json(updatedVacancy);
};

const deleteVacancy = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);

  const deletedVacancy = await vacancy.delete({
    where: { id: vacancyId },
  });

  recommendations.handleDelete(deletedVacancy, VACANCY);

  res.status(204).send();
};

const getVacancyLanguageLevels = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);

  await VacancyService.findOneOrThrow(vacancyId);

  const vacancyLanguageLevels = await vacancyLanguageLevel.findMany({
    where: {
      vacancyId,
    },
  });

  res.json(vacancyLanguageLevels);
};

const createVacancyLanguageLevel = async (req: Request, res: Response) => {
  const data = req.body;
  const vacancyId = Number(req.params.id);

  await VacancyLanguageLevelService.checkIfExist(data.language, vacancyId);

  const newVacancyLanguageLevel = await vacancyLanguageLevel.create({
    data: { ...data, vacancyId },
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(201).json(newVacancyLanguageLevel);
};

const updateVacancyLanguageLevel = async (req: Request, res: Response) => {
  const data = req.body;
  const vacancyId = Number(req.params.id);
  const language = req.params.language as Language;

  await VacancyLanguageLevelService.findOneOrThrow(language, vacancyId);

  const updatedVacancyLanguageLevel = await vacancyLanguageLevel.update({
    where: { language_vacancyId: { vacancyId, language } },
    data,
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(201).json(updatedVacancyLanguageLevel);
};

const deleteVacancyLanguageLevel = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);
  const language = req.params.language as Language;

  await VacancyLanguageLevelService.findOneOrThrow(language, vacancyId);

  await vacancyLanguageLevel.delete({
    where: { language_vacancyId: { vacancyId, language } },
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(204).send();
};

export {
  getVacancies,
  getVacancyById,
  getVacancyRecommendation,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getVacancyLanguageLevels,
  createVacancyLanguageLevel,
  updateVacancyLanguageLevel,
  deleteVacancyLanguageLevel,
};
