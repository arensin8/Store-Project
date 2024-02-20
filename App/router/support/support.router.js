const {
  SupportController,
} = require("../../http/controllers/support/support.controller");
const {  AdminApiNameSpaceRoute } = require("./namespace.router");
const {  AdminApiRoomsRoute } = require("./room.router");

const router = require("express").Router();

router.use("/namespace", AdminApiNameSpaceRoute)
router.use("/room", AdminApiRoomsRoute)
router.get("/", SupportController.renderChatRoom);


module.exports = {
  supporSectionRouter: router,
};
