import templates from '../consts/email';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { hashPassword } from '../utils/password';
import Email from './email';
import Token from './token';
import type { User } from '@prisma/client';

const user = prisma.user;

type IUser = {
  email: string;
  password: string;
  fullName: string;
  role: 'hr' | 'candidate';
  phoneNumber: string;
};

const UserService = {
  async checkFor(key: string, value: string, id: number = 0) {
    const exists = await user.findFirst({
      where: {
        [key]: value,
        NOT: { id },
      },
    });
    if (exists) {
      throw new ClientError(`The user with this ${key} already exists.`, 400);
    }
  },

  async findOrThrow(id: number) {
    const found = await user.findUnique({ where: { id } });
    if (!found) {
      throw new ClientError('This user does not exist', 404);
    }
    return found;
  },

  async sendConfirmTokenForEmail(id: number, email: string, fullName: string) {
    const token = Token.generateConfirmToken({ id });
    await Email.sendMail(email, templates.EMAIL_CONFIRM, { fullName, token });
  },

  async create(data: IUser) {
    await UserService.checkFor('email', data.email);

    const password = await hashPassword(data.password);
    const { id } = await user.create({
      data: { ...data, password },
    });
    const { email, fullName } = data;

    await UserService.sendConfirmTokenForEmail(id, email, fullName);
    return { id };
  },

  async update(curUser: User, data: IUser) {
    if (data.email) {
      await UserService.checkFor('email', data.email, curUser.id);
    }
    let isConfirmed = true;
    if (data.email && data.email !== curUser.email) {
      isConfirmed = false;
    }

    const updatedUser = await user.update({
      where: { id: curUser.id },
      data: { ...data, isConfirmed },
    });
    if (!isConfirmed) {
      await UserService.sendConfirmTokenForEmail(
        updatedUser.id,
        updatedUser.email,
        updatedUser.fullName,
      );
    }

    return { isConfirmed };
  },

  // async update(id: number, data: IUser) {
  //   if (data.email) {
  //     await UserService.checkFor('email', data.email, id);
  //   }

  //   await user.update({ where: { id }, data });
  // },
};

export default UserService;
