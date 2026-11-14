const Joi = require("joi");

const createCustomerSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().trim().email().required(),
  birth_date: Joi.date().optional(),
  gender_id: Joi.number().integer().required(),
  lang_id: Joi.number().integer().required(),
});

const updateCustomerSchema = Joi.object({
  first_name: Joi.string().trim(),
  last_name: Joi.string().trim(),
  phone: Joi.string().trim(),
  password: Joi.string().min(6),
  email: Joi.string().trim().email(),
  birth_date: Joi.date(),
  gender_id: Joi.number().integer(),
  lang_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
