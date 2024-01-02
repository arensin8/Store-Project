const { CoursesModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class ChapterController extends Controller {
  async addChapter(req, res, next) {
    try {
      const { id, text, title } = req.body;
      await CourseController.findCourseById(id);
      const saveChapterResult = await CoursesModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );
      if (saveChapterResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "Chapter isn't added successfully"
        );
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "Chapter added successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async chaptersOfCourse(req, res, next) {
    try {
      const { courseID } = req.params;

      const course = await this.getChaptersOfCourse(courseID);
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
  async getChaptersOfCourse(id) {
    const chapters = await CoursesModel.findOne(
      { _id: id },
      { chapters: 1, title: 1 }
    );
    if (!chapters)
      throw createHttpError.NotFound("This course don't have any chapters");
    return chapters;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
