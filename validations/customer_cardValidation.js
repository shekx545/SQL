const Joi = require("joi");

const createCustomerCardSchema = Joi.object({
  name: Joi.string().trim().allow(null, "").optional(),
  phone: Joi.string().trim().allow(null, "").optional(),
  number: Joi.string().trim().required(),
  year: Joi.string().trim().allow(null, "").optional(),
  month: Joi.string().trim().allow(null, "").optional(),
  is_active: Joi.boolean().optional(),
  is_main: Joi.boolean().optional(),
  customer_id: Joi.number().integer().required(),
});

const updateCustomerCardSchema = Joi.object({
  name: Joi.string().trim(),
  phone: Joi.string().trim(),
  number: Joi.string().trim(),
  year: Joi.string().trim(),
  month: Joi.string().trim(),
  is_active: Joi.boolean(),
  is_main: Joi.boolean(),
  customer_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createCustomerCardSchema,
  updateCustomerCardSchema,
};
