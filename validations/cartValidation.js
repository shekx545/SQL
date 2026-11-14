const Joi = require("joi");

const createCartSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  status_id: Joi.number().integer().required(),
});

const updateCartSchema = Joi.object({
  customer_id: Joi.number().integer(),
  status_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createCartSchema,
  updateCartSchema,
};
