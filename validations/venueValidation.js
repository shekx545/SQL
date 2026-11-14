const Joi = require("joi");

const createVenueSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  location: Joi.string().trim().allow(null, "").optional(),
  site: Joi.string().trim().allow(null, "").optional(),
  phone: Joi.string().trim().allow(null, "").optional(),
  schema: Joi.string().allow('').allow(null, "").optional(),
  region_id: Joi.number().integer().required(),
  district_id: Joi.number().integer().required(),
});

const updateVenueSchema = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  location: Joi.string().trim(),
  site: Joi.string().trim(),
  phone: Joi.string().trim(),
  schema: Joi.string().allow(''),
  region_id: Joi.number().integer(),
  district_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createVenueSchema,
  updateVenueSchema,
};
