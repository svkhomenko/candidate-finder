import Joi from 'joi';
import { RESUME_DESCRIPTION_LENGTH } from '../consts/validation';

const createSchema = Joi.object().keys({
  description: Joi.string()
    .required()
    .min(RESUME_DESCRIPTION_LENGTH.min)
    .max(RESUME_DESCRIPTION_LENGTH.max),
});

const updateSchema = Joi.object().keys({
  description: Joi.string().min(RESUME_DESCRIPTION_LENGTH.min).max(RESUME_DESCRIPTION_LENGTH.max),
});

export { createSchema, updateSchema };
