import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const vacancy = prisma.vacancy;

const createVacancy = async (req: Request, res: Response) => {
  const data = req.body;
  const newVacancy = await vacancy.create({
    data: data,
  });
  res.status(201).json(newVacancy);
};

export { createVacancy };
