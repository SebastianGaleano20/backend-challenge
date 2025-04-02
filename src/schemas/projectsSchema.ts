import Joi from "joi";

export const projectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  status: Joi.string().valid("IN_PROGRESS", "COMPLETED", "CANCELED"),
  developers: Joi.array()
    .items(
      Joi.object({
        devId: Joi.number().required(),
        role: Joi.string().valid("MANAGER", "DEVELOPER").optional(),
      })
    )
    .optional(),
});

export const projectQuerySchema = Joi.object({
  page: Joi.number().min(1).optional().default(1),
  limit: Joi.number().min(1).max(100).optional().default(10),
  search: Joi.string().optional(),
});

export const validateProject = (data: any) => {
  return projectSchema.validate(data);
};

export const validateProjectQuery = (query: any) => {
  return projectQuerySchema.validate(query);
};
