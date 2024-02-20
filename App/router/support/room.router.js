const { NamespaceController } = require("../../http/controllers/support/namespace.controller");
const { RoomController } = require("../../http/controllers/support/room.controller");
const { uploadFile } = require("../../utils/multer");


const router = require("express").Router();

router.post("/add",uploadFile.single('image'), RoomController.addRoom);
router.get("/all", RoomController.getAllRooms);


module.exports = {
  AdminApiRoomsRoute: router,
};
