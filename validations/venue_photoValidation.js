const Joi = require("joi");

const createVenuePhotoSchema = Joi.object({
  url: Joi.string().trim().required(),
  venue_id: Joi.number().integer().required(),
});

const updateVenuePhotoSchema = Joi.object({
  url: Joi.string().trim(),
  venue_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createVenuePhotoSchema,
  updateVenuePhotoSchema,
};
