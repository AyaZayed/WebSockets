var userId = localStorage.getItem("userId") || randomID();
localStorage.setItem("userId", userId);
console.info(userId);
var messageCashe;

function randomID() {
  return Math.floor(Math.random() * 1e11);
}

var socket = io.connect("http://localhost", { forceNew: true });
socket.on("messages", (data) => {
  console.info(data);
  messageCashe = data;
  render();
});

function render() {
  var data = messageCashe;
  var html = data
    .sort((a, b) => {
      return b.ts - a.ts;
    })
    .map(function (d, index) {
      return `
      <form class='message' onsubmit="return likeMessage(messageCashe[${index}])">
        <div class='name'>${d.userName}</div>
        <a href=${
          d.content.link
        } class='message' target='blank'>${d.content.text}</a>
        <div class='time'>${moment(d.ts).fromNow()}</div>
        <input type='submit' class='likes-count' value="${
          d.likedBy.length
        } likes">
      </form>
      `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function likeMessage(message) {
  var index = message.likedBy.indexOf(userId);
  if (index < 0) {
    message.likedBy.push(userId);
  } else {
    message.likedBy.splice(index, 1);
  }
  socket.emit("update-message", message);
  render();
  return false;
}

function addMessage(e) {
  var payload = {
    messageId: randomID(),
    userName: document.getElementById("username").value,
    content: {
      text: document.getElementById("message").value,
      link: document.getElementById("linkAddress").value,
    },
    likedBy: [],
    ts: Date.now(),
  };
  socket.emit("new-message", payload);
  render();
  return false;
}
