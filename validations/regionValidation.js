const Joi = require("joi");

const createRegionSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateRegionSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createRegionSchema,
  updateRegionSchema,
};
