const socket = io("http://localhost:3000");

function initNamespaceConnection(endpoint) {
  const namespaceSocket = io(`http://localhost:3000/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      for (const room of rooms) {
        const roomsElement = document.querySelector("#contacts ul");
        roomsElement.appendChild(`
        <li class="contact" roomName="${room.name}">
        <div class="wrap">
            <img src="${room.image}" height="40"/>
            <div class="meta">
                <p class="name">${room.name}</p>
                <p class="preview" >${room.description}</p>
            </div>
        </div>
    </li>
        `);
      }
    });
  });
}
socket.on("connect", () => {
  socket.on("NamespaceList", (namespacesList) => {
    const namespaceElement = document.getElementById("namespaces");
    initNamespaceConnection(namespacesList[0].endpoint);
    namespaceElement.innerHTML = "";
    for (const namespace of namespacesList) {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerText = namespace.title;
      li.appendChild(p);
      namespaceElement.appendChild(li);
    }
  });
});
