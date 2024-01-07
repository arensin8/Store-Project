const { default: getVideoDurationInSeconds } = require("get-video-duration");
const {
  createEpisodeSchema,
} = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime, copyObject } = require("../../../../utils/functions");
const { CoursesModel } = require("../../../../models/course");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { objectIdValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        courseId,
        chapterId,
        filename,
        fileUploadPath,
        type,
      } = await createEpisodeSchema.validateAsync(req.body);
      const videoPath = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoPath}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const episode = { title, text, time, videoPath, type };
      const createEpisodeResult = await CoursesModel.updateOne(
        {
          _id: courseId,
          "chapters._id": chapterId,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisodeResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          "Episode creating failed!"
        );
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "Episode created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeEpisode(req, res, next) {
    try {
      // const { id: episodeId } = await objectIdValidator.validateAsync({
      //   _id: req.params.episodeId,
      // });
      const { episodeId } = req.params;
      await this.getOneEpisode(episodeId);
      const removeEpisodeResult = await CoursesModel.updateOne(
        { "chapters.episodes._id": episodeId },
        {
          $pull: {
            "chapters.$.episodes": {
                _id: episodeId
            }
        }
        }
      );
      if (removeEpisodeResult.modifiedCount === 0) {
        throw new createHttpError.InternalServerError(
          "Episode deleting failed!"
        );
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "Episode deleted successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        courseId,
        chapterId,
        filename,
        fileUploadPath,
        type,
      } = await createEpisodeSchema.validateAsync(req.body);
      const videoPath = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoPath}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const episode = { title, text, time, videoPath, type };
      const createEpisodeResult = await CoursesModel.updateOne(
        {
          _id: courseId,
          "chapters._id": chapterId,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisodeResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          "Episode creating failed!"
        );
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "Episode created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneEpisode(id) {
    const episode = await CoursesModel.findOne(
      { "chapters.episodes._id": id },
      {
        "chapters.episodes.$": 1,
      }
    );
    if (!episode) throw new createHttpError.NotFound("Episode not found!");
    return episode;
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
