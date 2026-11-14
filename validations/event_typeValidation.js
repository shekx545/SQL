const Joi = require("joi");

const createEventTypeSchema = Joi.object({
  name: Joi.string().trim().required(),
  parent_event_type_id: Joi.number().integer().optional(),
});

const updateEventTypeSchema = Joi.object({
  name: Joi.string().trim(),
  parent_event_type_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createEventTypeSchema,
  updateEventTypeSchema,
};
