import Joi from "joi";

export const userSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});
