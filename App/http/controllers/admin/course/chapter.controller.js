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

  async removeChapterById(req, res, next) {
    try {
        const { chapterID } = req.params;
        console.log("chapterID:", chapterID);
        await this.getOneChapter(chapterID);

        const removeChapterResult = await CoursesModel.updateOne(
            { chapters: { _id: chapterID } },
            {
                $pull: {
                    chapters: { _id: chapterID }
                }
            }
        );

        if (removeChapterResult.nModified === 0) {
            throw new createHttpError.InternalServerError("حذف فصل انجام نشد");
        }

        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                message: "حذف فصل با موفقیت انجام شد"
            }
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
  async getOneChapter(id) {
    const chapter = await CoursesModel.findOne(
      { "chapters._id": id },
      { "$.": 1 }
    );
    if (!chapter) throw createHttpError.NotFound("Chapter not found");
    return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
