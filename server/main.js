var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// app.get("/", (req, res) => {
//   res.send("bored yet?");
//   console.log("express is alive");
// });

app.use(express.static("app"));

io.on("connection", (socket) => {
  console.log("socket.io is alive");
  socket.emit("messages", ["hi", "yes", "no"]);
});

server.listen("80");
