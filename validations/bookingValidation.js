const Joi = require("joi");

const createBookingSchema = Joi.object({
  cart_id: Joi.number().integer().required(),
  payment_method_id: Joi.number().integer().required(),
  delivery_method_id: Joi.number().integer().required(),
  discount_id: Joi.number().integer().optional(),
  status_id: Joi.number().integer().required(),
});

const updateBookingSchema = Joi.object({
  cart_id: Joi.number().integer(),
  payment_method_id: Joi.number().integer(),
  delivery_method_id: Joi.number().integer(),
  discount_id: Joi.number().integer(),
  status_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createBookingSchema,
  updateBookingSchema,
};
