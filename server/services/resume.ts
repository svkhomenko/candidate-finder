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
};

export default ResumeService;
