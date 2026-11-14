const Joi = require("joi");

const createGenderSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateGenderSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createGenderSchema,
  updateGenderSchema,
};
