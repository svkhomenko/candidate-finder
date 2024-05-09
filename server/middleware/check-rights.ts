import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { User, UserRole } from '@prisma/client';

const resume = prisma.resume;
const vacancy = prisma.vacancy;

const checkHRRights = async (req: Request, _res: Response, next: NextFunction) => {
  const { role } = req.user as User;

  if (role !== UserRole.hr) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

const checkCandidateRights = async (req: Request, _res: Response, next: NextFunction) => {
  const { role } = req.user as User;

  if (role !== UserRole.candidate) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

const checkUserResumeRights = async (req: Request, _res: Response, next: NextFunction) => {
  const resumeId = Number(req.params.id);
  const { id: userId } = req.user as User;

  const found = await resume.findUnique({
    where: { id: resumeId },
  });
  if (!found) {
    return next(new ClientError('The resume is not found.', 404));
  }
  if (found.userId !== userId) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

const checkUserVacancyRights = async (req: Request, _res: Response, next: NextFunction) => {
  const vacancyId = Number(req.params.id);
  const { id: userId } = req.user as User;

  const found = await vacancy.findUnique({
    where: { id: vacancyId },
  });
  if (!found) {
    return next(new ClientError('The vacancy is not found.', 404));
  }
  if (found.userId !== userId) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

export { checkHRRights, checkCandidateRights, checkUserResumeRights, checkUserVacancyRights };
