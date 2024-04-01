import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ResumeService from '../services/resume';
import recommendations from '../recommendation/recommendation';
import { RESUME } from '../consts/const';

const resume = prisma.resume;

const createResume = async (req: Request, res: Response) => {
  const data = req.body;

  const newResume = await resume.create({
    data: data,
  });

  recommendations.handleCreate(newResume, RESUME);

  res.status(201).json(newResume);
};

const updateResume = async (req: Request, res: Response) => {
  const data = req.body;
  const resumeId = Number(req.params.id);

  await ResumeService.findOneOrThrow(resumeId);

  const updatedResume = await resume.update({
    where: { id: resumeId },
    data,
  });

  recommendations.handleCreate(updatedResume, RESUME);

  res.status(201).json(updatedResume);
};

const deleteResume = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);

  await ResumeService.findOneOrThrow(resumeId);

  const deletedResume = await resume.delete({
    where: { id: resumeId },
  });

  recommendations.handleCreate(deletedResume, RESUME);

  res.status(204).send();
};

export { createResume, updateResume, deleteResume };
