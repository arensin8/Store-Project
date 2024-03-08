const {
  SupportController,
} = require("../../http/controllers/support/support.controller");
const { checkLogin, checkAccessLogin } = require("../../http/middlewares/auth");
const { AdminApiNameSpaceRoute } = require("./namespace.router");
const { AdminApiRoomsRoute } = require("./room.router");

const router = require("express").Router();

router.use("/namespace", AdminApiNameSpaceRoute);
router.use("/room", AdminApiRoomsRoute);
router.get("/login", SupportController.loginForm);
router.post("/login", SupportController.login);
router.get("/", checkLogin, SupportController.renderChatRoom);

module.exports = {
  supporSectionRouter: router,
};
