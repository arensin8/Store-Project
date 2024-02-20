const { RoomController } = require("../../http/controllers/support/room.controller");
const router = require("express").Router();

router.post("/add", RoomController.addRoom);
router.get("/all", RoomController.getAllRooms);


module.exports = {
  roomRouter: router,
};
