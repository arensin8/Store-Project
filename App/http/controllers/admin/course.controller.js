const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CoursesModel } = require("../../../models/course");
const Controller = require("../controller");
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;
      if (search)
        courses = await CoursesModel.find({ $text: { $search: search } }).sort({
          _id: -1,
        });
      else courses = await CoursesModel.find({}).sort({ _id: -1 });
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { text, short_text, title, price, discount, type, tags, category } =req.body;
      const teacher = req.user._id
      const course = await CoursesModel.create({
        text,
        short_text,
        title,
        price,
        discount,
        type,
        tags,
        category,
        image,
        time : "00:00:00",
        teacher
      });
      if(!course?._id) throw createHttpError.InternalServerError('Creating course uncompleted')
      return res.status(HttpStatus.CREATED).json({
    statusCode : HttpStatus.CREATED,
        data : {
          message : 'Course created successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
