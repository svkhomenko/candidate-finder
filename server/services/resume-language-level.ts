import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { Language } from '@prisma/client';

const resumeLanguageLevel = prisma.resumeLanguageLevel;

const ResumeLanguageLevelService = {
  async checkIfExist(language: Language, resumeId: number) {
    const exists = await resumeLanguageLevel.findFirst({
      where: {
        language: language,
        resumeId: resumeId,
      },
    });
    if (exists) {
      throw new ClientError(`The ${language} language already exists.`, 400);
    }
  },

  async findOneOrThrow(language: Language, resumeId: number) {
    const found = await resumeLanguageLevel.findFirst({
      where: {
        language: language,
        resumeId: resumeId,
      },
    });
    if (!found) {
      throw new ClientError('The language level is not found.', 404);
    }
    return found;
  },
};

export default ResumeLanguageLevelService;
