import prisma from '../lib/prisma';

const vacancy = prisma.vacancy;

const VacancyService = {
  async getAllDescriptions() {
    const found = await vacancy.findMany({
      select: {
        id: true,
        description: true,
      },
    });
    return found;
  },
};

export default VacancyService;
