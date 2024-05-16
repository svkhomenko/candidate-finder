import z from 'zod';
import {
  RESUME_TITLE_LENGTH,
  RESUME_DESCRIPTION_LENGTH,
  INT_MAX,
  EDUCATION_ENUM,
  CONTRACT_ENUM,
  LANGUAGE_ENUM,
  LEVEL_ENUM,
} from '../consts/validation';

export const createSchema = z
  .object({
    title: z.string().min(RESUME_TITLE_LENGTH.min).max(RESUME_TITLE_LENGTH.max),
    description: z.string().min(RESUME_DESCRIPTION_LENGTH.min).max(RESUME_DESCRIPTION_LENGTH.max),
    salaryMin: z.number({ invalid_type_error: 'Input salary' }).positive().max(INT_MAX),
    salaryMax: z.number({ invalid_type_error: 'Input salary' }).positive().max(INT_MAX),
    experience: z.number({ invalid_type_error: 'Input experience' }).min(0).max(INT_MAX),
    education: z.string().refine((education: string) => EDUCATION_ENUM.includes(education), {
      message: `Required`,
    }),
    place_id: z.string().min(1),
    address: z.string(),
    online: z.boolean(),
    contract: z.string().refine((contract: string) => CONTRACT_ENUM.includes(contract), {
      message: `Required`,
    }),
  })
  .refine((data) => data.salaryMin <= data.salaryMax, {
    message: 'salaryMax date must be more than salaryMin or equal',
    path: ['salaryMax'],
  });

export const updateSchema = z
  .object({
    title: z.string().min(RESUME_TITLE_LENGTH.min).max(RESUME_TITLE_LENGTH.max),
    description: z.string().min(RESUME_DESCRIPTION_LENGTH.min).max(RESUME_DESCRIPTION_LENGTH.max),
    salaryMin: z.number({ invalid_type_error: 'Input salary' }).positive().max(INT_MAX),
    salaryMax: z.number({ invalid_type_error: 'Input salary' }).positive().max(INT_MAX),
    experience: z.number({ invalid_type_error: 'Input experience' }).min(0).max(INT_MAX),
    education: z.string().refine((education: string) => EDUCATION_ENUM.includes(education), {
      message: `Required`,
    }),
    place_id: z.string().min(1),
    address: z.string(),
    online: z.boolean(),
    contract: z.string().refine((contract: string) => CONTRACT_ENUM.includes(contract), {
      message: `Required`,
    }),
  })
  .refine((data) => data.salaryMin <= data.salaryMax, {
    message: 'salaryMax date must be more than salaryMin or equal',
    path: ['salaryMax'],
  });

export const createResumeLanguageLevelSchema = z.object({
  language: z.string().refine((language: string) => LANGUAGE_ENUM.includes(language), {
    message: `Required`,
  }),
  level: z.string().refine((level: string) => LEVEL_ENUM.includes(level), {
    message: `Required`,
  }),
});

export const updateResumeLanguageLevelSchema = z.object({
  level: z.string().refine((level: string) => LEVEL_ENUM.includes(level), {
    message: `Required`,
  }),
});

export type ICreate = z.infer<typeof createSchema>;
export type IUpdate = z.infer<typeof updateSchema>;
export type ICreateResumeLanguageLevel = z.infer<typeof createResumeLanguageLevelSchema>;
export type IUpdateResumeLanguageLevel = z.infer<typeof updateResumeLanguageLevelSchema>;
