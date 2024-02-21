const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class RoomController extends Controller {
  async addRoom(req, res, next) {
    try {
      const { name, description, filename, fileUploadPath, namespace } =
        req.body;
      await this.findConversationWithEndpoint(namespace);
      await this.findRoomWithName(name);
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const room = { name, description, image };
      const conversation = await ConversationModel.updateOne(
        { endpoint: namespace },
        {
          $push: { rooms: room },
        }
      );
      if (!conversation)
        throw new createHttpError.InternalServerError("Room creating failed!");
      res.status(StatusCodes.CREATED).json({
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
          rooms: conversation.rooms,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoomWithName(name) {
    const conversation = await ConversationModel.findOne({
      "rooms.name": name,
    });
    if (conversation)
      throw new createHttpError.BadRequest("Room has already exists!");
  }
  async findConversationWithEndpoint(endpoint) {
    const conversation = await ConversationModel.findOne({ endpoint });
    if (!conversation)
      throw new createHttpError.NotFound("Entered namespace not found!");
  }
}

module.exports = {
  RoomController: new RoomController(),
};
