const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");

class UserAuthController {
  async login(req, res, next) {
    try {
        const result = await authSchema.validateAsync(req.body);
      return res.status(200).send("Login successfully!");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
