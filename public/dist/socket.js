const socket = io("http://localhost:3000");
let namespaceSocket;

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}
function getRoomInfo(room) {
  namespaceSocket.emit("joinRoom", room);
}

function initNamespaceConnection(endpoint) {
  namespaceSocket = io(`http://localhost:3000/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      const roomsElement = document.querySelector("#contacts ul");
      roomsElement.innerHTML = "";
      for (const room of rooms) {
        const parsedHtml = stringToHTML(`
            <li class="contact" roomName="${room.name}">
            <div class="wrap">
                <img src="${room.image}" height="40"/>
                <div class="meta">
                    <p class="name">${room.name}</p>
                    <p class="preview" >${room.description}</p>
                </div>
            </div>
            </li>`);
        roomsElement.appendChild(parsedHtml);
      }
      const roomNodes = document.querySelectorAll("ul li.contact");
      for (const room of roomNodes) {
        room.addEventListener("click", () => {
          const roomName = room.getAttribute("roomName");
          getRoomInfo(roomName)
        });
      }
      document.querySelectorAll("#contacts ul .contact").forEach((item) => {
        item.addEventListener("click", () => {
          // document.getElementById('roomName').innerText =
        });
      });
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
      p.setAttribute("class", "namespaceTitle");
      p.setAttribute("endpoint", namespace.endpoint);
      p.innerText = namespace.title;
      li.appendChild(p);
      namespaceElement.appendChild(li);
    }
    const namespaceNodes = document.querySelectorAll(
      "#namespaces li p.namespaceTitle"
    );
    console.log(namespaceNodes);
    for (const namespace of namespaceNodes) {
      namespace.addEventListener("click", () => {
        const endpoint = namespace.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      });
    }
  });
});
