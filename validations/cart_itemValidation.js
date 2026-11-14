const Joi = require("joi");

const createCartItemSchema = Joi.object({
  ticket_id: Joi.number().integer().required(),
  cart_id: Joi.number().integer().required(),
});

const updateCartItemSchema = Joi.object({
  ticket_id: Joi.number().integer(),
  cart_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createCartItemSchema,
  updateCartItemSchema,
};
