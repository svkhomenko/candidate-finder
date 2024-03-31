import Joi from 'joi';
import { VACANCY_DESCRIPTION_LENGTH } from '../consts/validation';

const createSchema = Joi.object().keys({
  description: Joi.string()
    .required()
    .min(VACANCY_DESCRIPTION_LENGTH.min)
    .max(VACANCY_DESCRIPTION_LENGTH.max),
});

export { createSchema };
