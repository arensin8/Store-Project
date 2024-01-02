const Joi = require("@hapi/joi");
const { mongoIdPattern } = require("../../../utils/constant");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("Category title is incorrect")),
  text: Joi.string().error(new Error("Your text is incorrect")),
  short_text: Joi.string().error(new Error("Your text is incorrect")),
  filename: Joi.string()
    .pattern(/(\.jpg|\.png|\.gif|\.jpeg|\.webp)$/i)
    .error(new Error("Your uploaded image has invalid format")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(new Error("Tags must be lower than 20")),
  category: Joi.string()
    .pattern(mongoIdPattern)
    .error(new Error("Category not found!")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createBlogSchema,
};
