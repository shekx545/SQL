const Joi = require("joi");

const createSectorSchema = Joi.object({
  sector_name: Joi.string().trim().required(),
});

const updateSectorSchema = Joi.object({
  sector_name: Joi.string().trim(),
}).min(1);

module.exports = {
  createSectorSchema,
  updateSectorSchema,
};
