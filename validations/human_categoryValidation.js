const Joi = require("joi");

const createHumanCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
  start_age: Joi.number().integer().required(),
  finish_age: Joi.number().integer().required(),
  gender_id: Joi.number().integer().required(),
});

const updateHumanCategorySchema = Joi.object({
  name: Joi.string().trim(),
  start_age: Joi.number().integer(),
  finish_age: Joi.number().integer(),
  gender_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createHumanCategorySchema,
  updateHumanCategorySchema,
};
