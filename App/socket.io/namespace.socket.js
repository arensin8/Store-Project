const { ConversationModel } = require("../models/conversation");

class NamespaceSocketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  initConnection() {
    this.#io.on("connection", async (socket) => {
      const namespaces = await ConversationModel.find(
        {},
        { title: 1, endpoint: 1 }
      ).sort({ id: -1 });
      socket.emit("NamespaceList", namespaces);
    });
  }
  async createNamespaceConnection() {
    const namespaces = await ConversationModel.find(
      {},
      { title: 1, endpoint: 1, rooms: 1 }
    ).sort({ id: -1 });
    for (const namespace of namespaces) {
      this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
        const conversation = await ConversationModel.findOne(
          { endpoint: namespace.endpoint },
          { rooms: 1 }
        ).sort({ id: -1 });
        socket.emit("roomList", conversation.rooms);
        socket.on("joinRoom", (roomName) => {
          const rooms = Array.from(socket.rooms);
          if (rooms.length > 1) {
            const lastRoom = rooms[1];
            // console.log(lastRoom);
            socket.leave(lastRoom);
          } else {
            // Handle the case where there's no second room
          }

          socket.join(roomName);
          const roomInfo = conversation.rooms.find(item => item.name == roomName)
          socket.emit('roomInfo' , roomInfo)
        });

      });
    }
  }
}

module.exports = {
  NamespaceSocketHandler,
};
