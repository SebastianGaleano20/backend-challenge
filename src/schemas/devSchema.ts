import Joi from "joi";

export const devSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  image: Joi.string().max(500).optional(),
  role: Joi.string().valid("MANAGER", "DEVELOPER").required(),
});
