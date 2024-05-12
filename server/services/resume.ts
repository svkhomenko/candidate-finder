import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { Education, Contract, Prisma } from '@prisma/client';
import { getEducationOptions, getContractOptions } from '../utils/query-options';

const resume = prisma.resume;

type IQueryParams = {
  userId?: string;
  q?: string;
  salaryMin?: string;
  salaryMax?: string;
  experience?: string;
  education?: Education[];
  place_id?: string;
  online?: string;
  contract?: Contract[];
};

const ResumeService = {
  async getAllDescriptions() {
    const found = await resume.findMany({
      select: {
        id: true,
        description: true,
      },
    });
    return found;
  },

  async getAllResumesById(resumesIds: Array<number>) {
    const resumes = await resume.findMany({
      where: {
        id: {
          in: resumesIds,
        },
      },
    });
    return resumes;
  },

  async findOneOrThrow(id: number) {
    const found = await resume.findFirst({
      where: { id },
    });
    if (!found) {
      throw new ClientError('The resume is not found.', 404);
    }
    return found;
  },

  getWhereOptions(queryParams: IQueryParams) {
    const where: Prisma.ResumeWhereInput = {};
    const { userId, q, salaryMin, salaryMax, experience, education, place_id, online, contract } =
      queryParams;

    if (userId) {
      where.userId = Number(userId);
    }
    if (q) {
      where.title = { contains: q };
      where.description = { contains: q };
    }
    if (salaryMin) {
      where.salaryMax = { gte: Number(salaryMin) };
    }
    if (salaryMax) {
      where.salaryMin = { lte: Number(salaryMax) };
    }
    if (experience) {
      where.experience = { gte: Number(experience) };
    }
    if (education && education.length !== 0) {
      where.education = { in: education };
    }
    if (place_id) {
      where.place_id = place_id;
    }
    if (online) {
      where.online = online === 'true';
    }
    if (contract && contract.length !== 0) {
      where.contract = { in: [...contract, 'any'] };
    }

    return where;
  },
};

export default ResumeService;
