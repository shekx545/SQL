const Joi = require("joi");

const createSeatSchema = Joi.object({
  row_number: Joi.number().integer().required(),
  number: Joi.number().integer().required(),
  location_in_schema: Joi.string().trim().allow(null, "").optional(),
  sector_id: Joi.number().integer().required(),
  venue_id: Joi.number().integer().required(),
  seat_type_id: Joi.number().integer().required(),
});

const updateSeatSchema = Joi.object({
  row_number: Joi.number().integer(),
  number: Joi.number().integer(),
  location_in_schema: Joi.string().trim(),
  sector_id: Joi.number().integer(),
  venue_id: Joi.number().integer(),
  seat_type_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createSeatSchema,
  updateSeatSchema,
};
