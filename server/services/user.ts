import templates from '../consts/email';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { hashPassword } from '../utils/password';
import Email from './email';
import Token from './token';

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

  async create(data: IUser) {
    await UserService.checkFor('email', data.email);

    const password = await hashPassword(data.password);
    const { id } = await user.create({
      data: { ...data, password },
    });
    const { email, fullName } = data;

    const token = Token.generateConfirmToken({ id });
    await Email.sendMail(email, templates.EMAIL_CONFIRM, { fullName, token });
    return { id };
  },
};

export default UserService;
