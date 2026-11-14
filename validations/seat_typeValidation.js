const Joi = require("joi");

const createSeatTypeSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateSeatTypeSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createSeatTypeSchema,
  updateSeatTypeSchema,
};
