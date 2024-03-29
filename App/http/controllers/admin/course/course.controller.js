const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CoursesModel } = require("../../../../models/course");
const Controller = require("../../controller");
const path = require("path");
const {
  createCourseSchema,
} = require("../../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const {
  copyObject,
  deleteInvalidPropertiesInObject,
  deleteFileInPublic,
  getCourseDuration,
} = require("../../../../utils/functions");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;
      if (search)
        courses = await CoursesModel.find({ $text: { $search: search } })
          .populate([
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, phone: 1, email: 1 },
            },
            // { path: "category", select: { children: 0, parent: 0 } },
          ])
          .sort({
            _id: -1,
          });
      else
        courses = await CoursesModel.find({})
          .populate([
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, phone: 1, email: 1 },
            },
            // { path: "category", select: { parent : 0 } },
          ])
          .sort({ _id: -1 });
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
      const { text, short_text, title, price, discount, type, tags, category } =
        req.body;
      if (Number(price) && type === "free")
        throw createHttpError.BadRequest(`You can't set price for free items`);
      const teacher = req.user._id;
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
        teacher,
      });
      if (!course?._id)
        throw createHttpError.InternalServerError(
          "Creating course uncompleted"
        );
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "Course created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CoursesModel.findById(id);
      course.time = getCourseDuration(course.chapters)
      if (!course) throw createHttpError.NotFound("Course not found");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await this.findCourseById(id);
      const data = copyObject(req.body);
      let blackListFields = [
        "time",
        "students",
        "comments",
        "chapters",
        "episodes",
        "likes",
        "dislikes",
        "bookmarks",
        "filename",
        "fileUploadPath",
      ];
      deleteInvalidPropertiesInObject(data, blackListFields);
      const { filename, fileUploadPath } = req.body;
      if (req.file) {
        data.image = path.join(fileUploadPath, filename);
        deleteFileInPublic(course.image);
      }
      const updateCourseResult = await CoursesModel.findOneAndUpdate(
        { _id: id },
        data
      );
      if (updateCourseResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError("Course updating failed");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "Course updated successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id))
      throw new createHttpError.BadRequest("Id is incorrect");
    const course = await CoursesModel.findById(id);
    if (!course) throw createHttpError.NotFound("course not found");
    return course;
  }
}

module.exports = {
  CourseController: new CourseController(),
};
