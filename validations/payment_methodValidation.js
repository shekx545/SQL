const Joi = require("joi");

const createPaymentMethodSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updatePaymentMethodSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createPaymentMethodSchema,
  updatePaymentMethodSchema,
};
