const Joi = require("joi");

const createTicketTypeSchema = Joi.object({
  ticket_type: Joi.string().trim().required(),
});

const updateTicketTypeSchema = Joi.object({
  ticket_type: Joi.string().trim(),
}).min(1);

module.exports = {
  createTicketTypeSchema,
  updateTicketTypeSchema,
};
