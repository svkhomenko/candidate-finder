import { Request, Response } from 'express';

const createResume = async (req: Request, res: Response) => {
  const data = req.body;

  res.status(201).json(data);
};

export { createResume };
