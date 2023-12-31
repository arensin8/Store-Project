const Joi = require("@hapi/joi");
const { mongoIdPattern } = require("../../../utils/constant");

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("Course title is incorrect")),
  text: Joi.string().error(new Error("Your text is incorrect")),
  short_text: Joi.string().error(new Error("Your text is incorrect")),
  tags: Joi.array().min(0).max(20).error(new Error("Tags must be lower than 20")),
  category: Joi.string().regex(mongoIdPattern).error(new Error("Category not found!")),
  price: Joi.number().error(new Error("Entered price is incorrect")),
  discount: Joi.number().error(new Error("Entered discount is incorrect")),
  filename: Joi.string().regex(/(\.jpg|\.png|\.gif|\.jpeg|\.webp)$/i).error(new Error("Your uploaded image has invalid format")),
  fileUploadPath: Joi.allow(),
  type: Joi.string().regex(/^(free|cash|premium)$/i).error(new Error("type should be cash,free or premium")),
});

const createEpisodeSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("Course title is incorrect")),
  text: Joi.string().error(new Error("Your text is incorrect")),
  courseId: Joi.string().regex(mongoIdPattern).error(new Error("Course id is incorrect")),
  chapterId: Joi.string().regex(mongoIdPattern).error(new Error("Chapter id is incorrect")),
  type: Joi.string().regex(/^(lock|unlock)$/i).error(new Error("type should be lock or unlock")),
  filename: Joi.string().regex(/(\.mp4|\.mpg|\.avi|\.mov|\.mkv)$/i).error(new Error("Your uploaded video has invalid format")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createCourseSchema,
  createEpisodeSchema
};
