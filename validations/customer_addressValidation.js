const Joi = require("joi");

const createCustomerAddressSchema = Joi.object({
  name: Joi.string().trim().allow(null, "").optional(),
  street: Joi.string().trim().allow(null, "").optional(),
  house: Joi.string().trim().allow(null, "").optional(),
  location: Joi.string().trim().allow(null, "").optional(),
  post_index: Joi.string().trim().allow(null, "").optional(),
  info: Joi.string().allow('').allow(null, "").optional(),
  customer_id: Joi.number().integer().required(),
  region_id: Joi.number().integer().required(),
  district_id: Joi.number().integer().required(),
  flat_id: Joi.number().integer().optional(),
});

const updateCustomerAddressSchema = Joi.object({
  name: Joi.string().trim(),
  street: Joi.string().trim(),
  house: Joi.string().trim(),
  location: Joi.string().trim(),
  post_index: Joi.string().trim(),
  info: Joi.string().allow(''),
  customer_id: Joi.number().integer(),
  region_id: Joi.number().integer(),
  district_id: Joi.number().integer(),
  flat_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createCustomerAddressSchema,
  updateCustomerAddressSchema,
};
