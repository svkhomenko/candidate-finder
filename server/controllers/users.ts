import { Request, Response } from 'express';
import UserService from '../services/user';

const getUserById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const found = await UserService.findOrThrow(userId);
  const { password, isConfirmed, ...toSend } = found;

  res.status(200).json(toSend);
};

export { getUserById };
