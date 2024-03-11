const socket = io("http://localhost:3000");
let namespaceSocket;

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}
function getRoomInfo(endpoint, roomName) {
  document.querySelector("#roomName h3").setAttribute("roomName", roomName);
  document.querySelector("#roomName h3").setAttribute("endpoint", endpoint);
  namespaceSocket.emit("joinRoom", roomName);
  namespaceSocket.on("roomInfo", (roomInfo) => {
    document.querySelector("#roomName h3").innerText = roomInfo.description;
  });
  namespaceSocket.on("countOfOnlineUsers", (count) => {
    document.getElementById("onlineCount").innerHTML = count;
  });
}

function initNamespaceConnection(endpoint) {
  if (namespaceSocket) namespaceSocket.close();
  namespaceSocket = io(`http://localhost:3000/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      getRoomInfo(endpoint, rooms[0]?.name);
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
          getRoomInfo(endpoint, roomName);
        });
      }
    });
  });
}

function sendMessage() {
  const roomName = document
    .querySelector("#roomName h3")
    .getAttribute("roomName");
  const endpoint = document
    .querySelector("#roomName h3")
    .getAttribute("endpoint");
  const message = document.querySelector(
    ".message-input input#messageInput"
  ).value;
  if (message.trim() == "") {
    return alert("Input can not be empty");
  }
  const userId = document.getElementById("userId").value;
  console.log(userId);
  namespaceSocket.emit("newMessage", {
    message,
    roomName,
    endpoint,
    sender: userId,
  });
  namespaceSocket.on("confirmMessage", (data) => {
    console.log(data);
  });
  const li = stringToHTML(`
    <li class="sent">
      <img src="http://emilcarlsson.se/assets/harveyspecter.png"
        alt="" />
      <p>${message}</p>
    </li>
  `);
  document.querySelector(".messages ul").appendChild(li);
  document.querySelector(".message-input input#messageInput").value = "";
  const messagesElement = document.querySelector("div.messages");
  messagesElement.scrollTo(0, messagesElement.scrollHeight);
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
    for (const namespace of namespaceNodes) {
      namespace.addEventListener("click", () => {
        const endpoint = namespace.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      });
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code == "enter") {
      sendMessage();
    }
  });
  document.querySelector("button.submit").addEventListener("click", () => {
    sendMessage();
  });
});
