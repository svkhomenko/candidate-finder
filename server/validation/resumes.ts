import Joi from 'joi';
import {
  RESUME_TITLE_LENGTH,
  RESUME_DESCRIPTION_LENGTH,
  INT_MAX,
  EDUCATION_ENUM,
  LATITUDE,
  LONGITUDE,
  CONTRACT_ENUM,
  LANGUAGE_ENUM,
  LEVEL_ENUM,
} from '../consts/validation';

const createSchema = Joi.object().keys({
  title: Joi.string().required().min(RESUME_TITLE_LENGTH.min).max(RESUME_TITLE_LENGTH.max),
  description: Joi.string()
    .required()
    .min(RESUME_DESCRIPTION_LENGTH.min)
    .max(RESUME_DESCRIPTION_LENGTH.max),
  salaryMin: Joi.number().required().positive().max(INT_MAX),
  salaryMax: Joi.number().required().positive().min(Joi.ref('salaryMin')).max(INT_MAX),
  experience: Joi.number().required().min(0).max(INT_MAX),
  education: Joi.string()
    .valid(...EDUCATION_ENUM)
    .required(),
  latitude: Joi.number().required().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Joi.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
  online: Joi.boolean().required(),
  contract: Joi.string()
    .valid(...CONTRACT_ENUM)
    .required(),
});

const updateSchema = Joi.object()
  .keys({
    title: Joi.string().min(RESUME_TITLE_LENGTH.min).max(RESUME_TITLE_LENGTH.max),
    description: Joi.string().min(RESUME_DESCRIPTION_LENGTH.min).max(RESUME_DESCRIPTION_LENGTH.max),
    salaryMin: Joi.number().positive().max(INT_MAX),
    salaryMax: Joi.number().positive().min(Joi.ref('salaryMin')).max(INT_MAX),
    experience: Joi.number().min(0).max(INT_MAX),
    education: Joi.string().valid(...EDUCATION_ENUM),
    latitude: Joi.number().min(LATITUDE.min).max(LATITUDE.max),
    longitude: Joi.number().min(LONGITUDE.min).max(LONGITUDE.max),
    online: Joi.boolean(),
    contract: Joi.string().valid(...CONTRACT_ENUM),
  })
  .and('salaryMin', 'salaryMax');

const createResumeLanguageLevelsSchema = Joi.object().keys({
  language: Joi.string()
    .valid(...LANGUAGE_ENUM)
    .required(),
  level: Joi.string()
    .valid(...LEVEL_ENUM)
    .required(),
});

const updateResumeLanguageLevelsSchema = Joi.object().keys({
  level: Joi.string()
    .valid(...LEVEL_ENUM)
    .required(),
});

const getResumesSchema = Joi.object()
  .keys({
    _start: Joi.number().min(0),
    _end: Joi.number().greater(Joi.ref('_start')),
    userId: Joi.number(),
    q: Joi.string(),
    salaryMin: Joi.number().positive().max(INT_MAX),
    salaryMax: Joi.number().positive().max(INT_MAX),
    experience: Joi.number().min(0).max(INT_MAX),
    education: Joi.string().valid(...EDUCATION_ENUM),
    online: Joi.boolean(),
    contract: Joi.string().valid(...CONTRACT_ENUM),
  })
  .and('_start', '_end');

export {
  createSchema,
  updateSchema,
  createResumeLanguageLevelsSchema,
  updateResumeLanguageLevelsSchema,
  getResumesSchema,
};
