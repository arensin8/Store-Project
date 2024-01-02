const Joi = require("@hapi/joi");

const createError = require("http-errors");
const { mongoIdPattern } = require("../../utils/constant");

const objectIdValidator = Joi.object({
  id: Joi.string().regex(mongoIdPattern).error(new Error("Id is Incorrect")),
});

module.exports = {
  objectIdValidator,
};
