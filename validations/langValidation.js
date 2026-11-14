const Joi = require("joi");

const createLangSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateLangSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createLangSchema,
  updateLangSchema,
};
