const Joi = require("joi");

const createCountrySchema = Joi.object({
  country_name: Joi.string().trim().required(),
});

const updateCountrySchema = Joi.object({
  country_name: Joi.string().trim(),
}).min(1);

module.exports = {
  createCountrySchema,
  updateCountrySchema,
};
