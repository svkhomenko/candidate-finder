import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ResumeService from '../services/resume';

const resume = prisma.resume;

const createResume = async (req: Request, res: Response) => {
  const data = req.body;

  const newResume = await resume.create({
    data: data,
  });

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

  res.status(201).json(updatedResume);
};

const deleteResume = async (req: Request, res: Response) => {
  const resumeId = Number(req.params.id);

  await ResumeService.findOneOrThrow(resumeId);

  await resume.delete({
    where: { id: resumeId },
  });

  res.status(204).send();
};

export { createResume, updateResume, deleteResume };
