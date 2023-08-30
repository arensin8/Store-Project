const Controller = require("../controller");

class HomeController extends Controller {
  indexPage(req, res, next) {
    return res.status(200).send("Index page store");
  }
}

module.exports = new HomeController();
