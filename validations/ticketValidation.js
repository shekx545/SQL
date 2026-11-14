const Joi = require("joi");

const createTicketSchema = Joi.object({
  price: Joi.number().required(),
  service_fee: Joi.number().optional(),
  event_id: Joi.number().integer().required(),
  seat_id: Joi.number().integer().required(),
  status_id: Joi.number().integer().required(),
  ticket_type_id: Joi.number().integer().required(),
});

const updateTicketSchema = Joi.object({
  price: Joi.number(),
  service_fee: Joi.number(),
  event_id: Joi.number().integer(),
  seat_id: Joi.number().integer(),
  status_id: Joi.number().integer(),
  ticket_type_id: Joi.number().integer(),
}).min(1);

module.exports = {
  createTicketSchema,
  updateTicketSchema,
};
