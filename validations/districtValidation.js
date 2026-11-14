const Joi = require("joi");

const createDistrictSchema = Joi.object({
  name: Joi.string().trim().required(),
  region_id: Joi.number().integer().required(),
});

const updateDistrictSchema = Joi.object({
  name: Joi.string().trim(),
  region_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createDistrictSchema,
  updateDistrictSchema,
};
