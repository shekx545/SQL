const Joi = require("joi");

const createAdminSchema = Joi.object({
  name: Joi.string().trim().required(),
  login: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
  is_active: Joi.boolean().optional(),
  is_creator: Joi.boolean().optional(),
});

const updateAdminSchema = Joi.object({
  name: Joi.string().trim(),
  login: Joi.string().trim(),
  password: Joi.string().min(6),
  is_active: Joi.boolean(),
  is_creator: Joi.boolean(),
}).min(1);

module.exports = {
  createAdminSchema,
  updateAdminSchema,
};
