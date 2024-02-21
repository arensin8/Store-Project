const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");

class NamespaceController extends Controller {
  async addNamespace(req, res, next) {
    try {
      const { title, endpoint } = req.body;
      await this.findNamespaceWithEndpoint(endpoint)
      const nameSpace = await ConversationModel.create({ title, endpoint });
      if (!nameSpace)
        throw new createHttpError.InternalServerError(
          "Name space creating failed!"
        );
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "Namespace created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllNamespaces(req, res, next) {
    try {
      const nameSpaces = await ConversationModel.find({}, { rooms: 0 });
      if (!nameSpaces)
        throw new createHttpError.NotFound("There isnt any namespace");
      res.statusCode(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          nameSpaces,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findNamespaceWithEndpoint(endpoint){
    const conversation = await ConversationModel.findOne({endpoint});
    if(conversation) throw new createHttpError.BadRequest("Namespace has already added with this name before!")
  }
}

module.exports = {
  NamespaceController: new NamespaceController(),
};
