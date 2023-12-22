const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CoursesModel } = require("../../../models/course");
const Controller = require("../controller");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;
      if (search)
        courses = await CoursesModel.find({ $text: { $search: search } }).sort({_id: -1,});
      else courses = await CoursesModel.find({}).sort({_id: -1,});
      res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
