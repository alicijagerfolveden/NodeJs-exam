import Joi from "joi";

export const groupSchema = Joi.object({
  name: Joi.string().required(),
});
