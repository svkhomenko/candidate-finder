import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import VacancyService from '../services/vacancy';
import recommendations from '../recommendation/recommendation';
import { getPageOptions } from '../utils/query-options';

const vacancy = prisma.vacancy;
const resume = prisma.resume;

const createVacancy = async (req: Request, res: Response) => {
  const data = req.body;

  const newVacancy = await vacancy.create({
    data: data,
  });

  res.status(201).json(newVacancy);
};

const getVacancyRecommendation = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);
  await VacancyService.findOneOrThrow(vacancyId);

  const recommendatedResumes = await recommendations.getRecommendatedResumes(vacancyId);
  const curResumesIds = [];
  const pagination = getPageOptions(req.query);

  for (
    let i = pagination.skip;
    i < recommendatedResumes.length && i < pagination.skip + pagination.take;
    i++
  ) {
    curResumesIds.push(recommendatedResumes[i].id);
  }

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
    };
  });

  res.setHeader('X-Total-Count', recommendatedResumes.length);
  res.json(result);
};

const updateVacancy = async (req: Request, res: Response) => {
  const data = req.body;
  const vacancyId = Number(req.params.id);

  await VacancyService.findOneOrThrow(vacancyId);

  const updatedVacancy = await vacancy.update({
    where: { id: vacancyId },
    data,
  });

  res.status(201).json(updatedVacancy);
};

const deleteVacancy = async (req: Request, res: Response) => {
  const vacancyId = Number(req.params.id);

  await VacancyService.findOneOrThrow(vacancyId);

  await vacancy.delete({
    where: { id: vacancyId },
  });

  res.status(204).send();
};

export { createVacancy, getVacancyRecommendation, updateVacancy, deleteVacancy };
