const Joi = require("joi");

const createTicketStatusSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateTicketStatusSchema = Joi.object({
  name: Joi.string().trim(),
}).min(1);

module.exports = {
  createTicketStatusSchema,
  updateTicketStatusSchema,
};
