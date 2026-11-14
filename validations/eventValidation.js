
const Joi = require("joi");

const createEventSchema = Joi.object({
  name: Joi.string().trim().required(),
  photo: Joi.string().trim().allow(null, "").optional(),
  start_date: Joi.date().optional(),
  start_time: Joi.string().trim().allow(null, "").optional(),
  finish_date: Joi.date().optional(),
  finish_time: Joi.string().trim().allow(null, "").optional(),
  info: Joi.string().trim().allow(null, "").optional(),
  release_date: Joi.date().optional(),
  event_type_id: Joi.number().integer().required(),
  human_category_id: Joi.number().integer().required(),
  venue_id: Joi.number().integer().required(),
  lang_id: Joi.number().integer().required(),
});

const updateEventSchema = Joi.object({
  name: Joi.string().trim(),
  photo: Joi.string().trim().allow(null, ""),
  start_date: Joi.date(),
  start_time: Joi.string().trim().allow(null, ""),
  finish_date: Joi.date(),
  finish_time: Joi.string().trim().allow(null, ""),
  info: Joi.string().trim().allow(null, ""),
  release_date: Joi.date(),
  event_type_id: Joi.number().integer(),
  human_category_id: Joi.number().integer(),
  venue_id: Joi.number().integer(),
  lang_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createEventSchema,
  updateEventSchema,
};
