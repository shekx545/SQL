const Joi = require("joi");

const createFlatSchema = Joi.object({
  etaj: Joi.number().integer().required(),
  condition: Joi.string().trim().allow(null, "").optional(),
});

const updateFlatSchema = Joi.object({
  etaj: Joi.number().integer(),
  condition: Joi.string().trim(),
}).min(1);

module.exports = {
  createFlatSchema,
  updateFlatSchema,
};

