import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import UserService from '../services/user';

const user = prisma.user;

const getProfile = async (req: Request, res: Response) => {
  const { password, isConfirmed, ...toSend } = req.user as User;

  res.json(toSend);
};

const updateProfile = async (req: Request, res: Response) => {
  const curUser = req.user as User;
  const data = req.body;

  const { isConfirmed } = await UserService.update(curUser, data);

  if (!isConfirmed) {
    res.clearCookie('refreshToken');
  }

  res.sendStatus(204);
};

const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  await user.delete({ where: { id } });

  res.sendStatus(204);
};

export { getProfile, updateProfile, deleteProfile };
