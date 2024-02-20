const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");
const path = require('path')

class RoomController extends Controller {
  async addRoom(req, res, next) {
    try {
      const { name, description,filename,fileUploadPath } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const room = await ConversationModel.create({ name, description,image });
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
      const conversation = await ConversationModel.find({}, { rooms: 1 });
      if (!conversation)
        throw new createHttpError.NotFound("There isnt any rooms");
      res.statusCode(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          rooms : conversation.rooms,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoomWithName(name){
    const conversation = await ConversationModel.findOne({'rooms.name' : name});
    if(conversation) throw new createHttpError.BadRequest("Room has already exists!")
  }
}

module.exports = {
    RoomController: new RoomController(),
};
