const { UserModel } = require("../../../models/users");
const { SignAccessToken } = require("../../../utils/functions");
const Controller = require("../controller");

class SupportController extends Controller {
  loginForm(req, res, next) {
    try {
      return res.render("login.ejs" , {
        error : undefined
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { phone } = req.body;
      const user = await UserModel.findOne({ phone });
      if (!user) {
        return res.render("login.ejs", {
          error: "Username is incorrect!",
        });
      }
      const token = await SignAccessToken(user._id);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  renderChatRoom(req, res, next) {
    try {
      return res.render("chat.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  SupportController: new SupportController(),
};
