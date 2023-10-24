const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors");

class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).send("Index page stored");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
}

module.exports = new HomeController();
