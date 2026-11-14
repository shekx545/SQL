const Joi = require("joi");

const createDiscountSchema = Joi.object({
  discount: Joi.string().trim().required(),
  finish_date: Joi.date().optional(),
});

const updateDiscountSchema = Joi.object({
  discount: Joi.string().trim(),
  finish_date: Joi.date(),
}).min(1);

module.exports = {
  createDiscountSchema,
  updateDiscountSchema,
};
