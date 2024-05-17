import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { Language } from '@prisma/client';

const vacancyLanguageLevel = prisma.vacancyLanguageLevel;

const VacancyLanguageLevelService = {
  async checkIfExist(language: Language, vacancyId: number) {
    const exists = await vacancyLanguageLevel.findFirst({
      where: {
        language: language,
        vacancyId: vacancyId,
      },
    });
    if (exists) {
      throw new ClientError(`The ${language} language already exists.`, 400);
    }
  },

  async findOneOrThrow(language: Language, vacancyId: number) {
    const found = await vacancyLanguageLevel.findFirst({
      where: {
        language: language,
        vacancyId: vacancyId,
      },
    });
    if (!found) {
      throw new ClientError('The language level is not found.', 404);
    }
    return found;
  },
};

export default VacancyLanguageLevelService;
