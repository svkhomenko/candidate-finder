import prisma from '../lib/prisma';

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
};

export default ResumeService;
