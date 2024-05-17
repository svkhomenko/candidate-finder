import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ResumeService from '../services/resume';
import ResumeLanguageLevelService from '../services/resume-language-level';
import recommendations from '../recommendation/recommendation';
import { RESUME } from '../consts/const';
import { User, Language } from '@prisma/client';
import { getPageOptions } from '../utils/query-options';
import ClientError from '../types/error';

const resume = prisma.resume;
const resumeLanguageLevel = prisma.resumeLanguageLevel;

const getResumes = async (req: Request, res: Response) => {
  const where = ResumeService.getWhereOptions(req.query);

  const [count, resumes] = await prisma.$transaction([
    resume.count({ where }),
    resume.findMany({
      where,
      ...getPageOptions(req.query),
    }),
  ]);

  res.header('X-Total-Count', `${count}`).json(resumes);
};

const getResumeById = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);

  const found = await ResumeService.findOneOrThrow(resumeId);

  res.status(200).json(found);
};

const createResume = async (req: Request, res: Response) => {
  const data = req.body;
  const { id: userId } = req.user as User;

  const newResume = await resume.create({
    data: { ...data, userId },
  });

  recommendations.handleCreate(newResume, RESUME);

  res.status(201).json(newResume);
};

const updateResume = async (req: Request, res: Response) => {
  const data = req.body;
  const resumeId = Number(req.params.id);

  const found = await ResumeService.findOneOrThrow(resumeId);

  const updatedResume = await resume.update({
    where: { id: resumeId },
    data,
  });

  if (data.description && data.description !== found.description) {
    recommendations.handleUpdate(updatedResume, RESUME);
  } else {
    recommendations.handleUpdateWithoutChangingDesc();
  }

  res.status(201).json(updatedResume);
};

const deleteResume = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);

  const deletedResume = await resume.delete({
    where: { id: resumeId },
  });

  recommendations.handleDelete(deletedResume, RESUME);

  res.status(204).send();
};

const getResumeLanguageLevels = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);

  await ResumeService.findOneOrThrow(resumeId);

  const resumeLanguageLevels = await resumeLanguageLevel.findMany({
    where: {
      resumeId,
    },
  });

  res.json(resumeLanguageLevels);
};

const createResumeLanguageLevel = async (req: Request, res: Response) => {
  const data = req.body;
  const resumeId = Number(req.params.id);

  await ResumeLanguageLevelService.checkIfExist(data.language, resumeId);

  const newResumeLanguageLevel = await resumeLanguageLevel.create({
    data: { ...data, resumeId },
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(201).json(newResumeLanguageLevel);
};

const updateResumeLanguageLevel = async (req: Request, res: Response) => {
  const data = req.body;
  const resumeId = Number(req.params.id);
  const language = req.params.language as Language;

  await ResumeLanguageLevelService.findOneOrThrow(language, resumeId);

  const updatedResumeLanguageLevel = await resumeLanguageLevel.update({
    where: { language_resumeId: { resumeId, language } },
    data,
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(201).json(updatedResumeLanguageLevel);
};

const deleteResumeLanguageLevel = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);
  const language = req.params.language as Language;

  await ResumeLanguageLevelService.findOneOrThrow(language, resumeId);

  await resumeLanguageLevel.delete({
    where: { language_resumeId: { resumeId, language } },
  });

  recommendations.handleUpdateWithoutChangingDesc();

  res.status(204).send();
};

export {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  getResumeLanguageLevels,
  createResumeLanguageLevel,
  updateResumeLanguageLevel,
  deleteResumeLanguageLevel,
};
