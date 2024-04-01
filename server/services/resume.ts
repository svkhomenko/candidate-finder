import prisma from '../lib/prisma';
import ClientError from '../types/error';

const resume = prisma.resume;

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
};

export default ResumeService;
