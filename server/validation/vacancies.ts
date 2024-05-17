import Joi from 'joi';
import {
  VACANCY_TITLE_LENGTH,
  VACANCY_DESCRIPTION_LENGTH,
  INT_MAX,
  EDUCATION_ENUM,
  CONTRACT_ENUM,
  LANGUAGE_ENUM,
  LEVEL_ENUM,
} from '../consts/validation';

const createSchema = Joi.object().keys({
  title: Joi.string().required().min(VACANCY_TITLE_LENGTH.min).max(VACANCY_TITLE_LENGTH.max),
  description: Joi.string()
    .required()
    .min(VACANCY_DESCRIPTION_LENGTH.min)
    .max(VACANCY_DESCRIPTION_LENGTH.max),
  salaryMin: Joi.number().required().positive().max(INT_MAX),
  salaryMax: Joi.number().required().positive().min(Joi.ref('salaryMin')).max(INT_MAX),
  experience: Joi.number().required().min(0).max(INT_MAX),
  education: Joi.string()
    .valid(...EDUCATION_ENUM)
    .required(),
  place_id: Joi.string().required(),
  address: Joi.string().required(),
  online: Joi.boolean().required(),
  contract: Joi.string()
    .valid(...CONTRACT_ENUM)
    .required(),
});

const updateSchema = Joi.object()
  .keys({
    title: Joi.string().min(VACANCY_TITLE_LENGTH.min).max(VACANCY_TITLE_LENGTH.max),
    description: Joi.string()
      .min(VACANCY_DESCRIPTION_LENGTH.min)
      .max(VACANCY_DESCRIPTION_LENGTH.max),
    salaryMin: Joi.number().positive().max(INT_MAX),
    salaryMax: Joi.number().positive().min(Joi.ref('salaryMin')).max(INT_MAX),
    experience: Joi.number().min(0).max(INT_MAX),
    education: Joi.string().valid(...EDUCATION_ENUM),
    place_id: Joi.string().required(),
    address: Joi.string().required(),
    online: Joi.boolean(),
    contract: Joi.string().valid(...CONTRACT_ENUM),
  })
  .and('salaryMin', 'salaryMax');

const createVacancyLanguageLevelsSchema = Joi.object().keys({
  language: Joi.string()
    .valid(...LANGUAGE_ENUM)
    .required(),
  level: Joi.string()
    .valid(...LEVEL_ENUM)
    .required(),
});

const updateVacancyLanguageLevelsSchema = Joi.object().keys({
  level: Joi.string()
    .valid(...LEVEL_ENUM)
    .required(),
});

const getVacanciesSchema = Joi.object()
  .keys({
    _start: Joi.number().min(0),
    _end: Joi.number().greater(Joi.ref('_start')),
    userId: Joi.number(),
    q: Joi.string(),
    salaryMin: Joi.number().positive().max(INT_MAX),
    salaryMax: Joi.number().positive().max(INT_MAX),
    experienceMin: Joi.number().min(0).max(INT_MAX),
    experienceMax: Joi.number().min(0).max(INT_MAX),
    education: Joi.array().items(Joi.string().valid(...EDUCATION_ENUM)),
    place_id: Joi.string(),
    online: Joi.boolean(),
    contract: Joi.array().items(Joi.string().valid(...CONTRACT_ENUM)),
  })
  .and('_start', '_end');

export {
  createSchema,
  updateSchema,
  createVacancyLanguageLevelsSchema,
  updateVacancyLanguageLevelsSchema,
  getVacanciesSchema,
};
