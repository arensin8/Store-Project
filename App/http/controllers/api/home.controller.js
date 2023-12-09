const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");


class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(httpStatus.OK).send("Index page stored");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
}

module.exports = new HomeController();
