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
    const namespaces = await ConversationModel.find({},{ title: 1, endpoint: 1, rooms: 1 })
    .sort({ id: -1 });
    for (const namespace of namespaces) {
      this.#io.of(`/${namespace.endpoint}`).on("connection", (socket) => {
        socket.emit("roomList", namespace.rooms);
      });
    }
  }
}

module.exports = {
  NamespaceSocketHandler,
};
