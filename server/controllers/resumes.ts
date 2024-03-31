import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const resume = prisma.resume;

const createResume = async (req: Request, res: Response) => {
  const data = req.body;
  const newResume = await resume.create({
    data: data,
  });
  res.status(201).json(newResume);
};

export { createResume };
