import Joi from "joi";

export const accountsSchema = Joi.object({
  group_id: Joi.number().required(),
  user_id: Joi.number().required(),
});
