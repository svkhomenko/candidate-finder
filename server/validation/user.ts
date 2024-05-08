import Joi from 'joi';
import { FULL_NAME_LENGTH, PASSWORD_LENGTH, ROLE_ENUM } from '../consts/validation';

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
  fullName: Joi.string().required().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
  role: Joi.string()
    .valid(...ROLE_ENUM)
    .required(),
  phoneNumber: Joi.string()
    .regex(/^\+?(?:[0-9] ?){6,14}[0-9]$/)
    .messages({ 'string.pattern.base': `Invalid phone number` })
    .required(),
});

const updateSchema = Joi.object().keys({
  email: Joi.string().email(),
  fullName: Joi.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
  phoneNumber: Joi.string()
    .regex(/^\+?(?:[0-9] ?){6,14}[0-9]$/)
    .messages({ 'string.pattern.base': `Invalid phone number` }),
});

export { loginSchema, registerSchema, updateSchema };
