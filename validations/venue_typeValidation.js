const Joi = require("joi");

const createVenueTypeSchema = Joi.object({
  venue_id: Joi.number().integer().required(),
  type_id: Joi.number().integer().required(),
});

const updateVenueTypeSchema = Joi.object({
  venue_id: Joi.number().integer(),
  type_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createVenueTypeSchema,
  updateVenueTypeSchema,
};