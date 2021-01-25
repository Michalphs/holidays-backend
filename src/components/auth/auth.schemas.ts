import Joi from 'joi';

export const authLoginSchema = Joi.object({
  email: Joi.string().required().email().max(64),
  password: Joi.string().required().max(64).min(6),
});
