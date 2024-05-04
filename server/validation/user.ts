import Joi from 'joi';
import { FULL_NAME_LENGTH, PASSWORD_LENGTH, ROLE_ENUM } from '../consts/validation';

const JoiWithPhoneNumber = Joi.extend(require('joi-phone-number'));

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
  phoneNumber: JoiWithPhoneNumber.string().phoneNumber().required(),
});

export { loginSchema, registerSchema };
