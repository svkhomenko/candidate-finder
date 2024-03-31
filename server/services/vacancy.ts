import prisma from '../lib/prisma';
import ClientError from '../types/error';

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

  async findOneOrThrow(id: number) {
    const found = await vacancy.findFirst({
      where: { id },
    });
    if (!found) {
      throw new ClientError('The vacancy is not found.', 404);
    }
    return found;
  },
};

export default VacancyService;
