const Joi = require("joi");

const createTypesSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateTypesSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createTypesSchema,
  updateTypesSchema,
};
