const Joi = require("joi");

const createDeliveryMethodSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateDeliveryMethodSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createDeliveryMethodSchema,
  updateDeliveryMethodSchema,
};
