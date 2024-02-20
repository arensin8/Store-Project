const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");

class RoomController extends Controller {
  async addRoom(req, res, next) {
    try {
      const { title, endpoint } = req.body;
      const room = await ConversationModel.create({ title, endpoint });
      if (!room)
        throw new createHttpError.InternalServerError(
          "Room creating failed!"
        );
      res.statusCode(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "Room created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllRooms(req, res, next) {
    try {
      const rooms = await ConversationModel.find({}, { rooms: 0 });
      if (!rooms)
        throw new createHttpError.NotFound("There isnt any namespace");
      res.statusCode(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          rooms,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
    RoomController: new RoomController(),
};
