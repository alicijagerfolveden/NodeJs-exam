import Joi from "joi";

export const billsSchema = Joi.object({
  group_id: Joi.number().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
});
