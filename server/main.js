var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", (req, res) => {
  res.send("bored yet?");
  console.log("express is alive");
});

server.listen("80");
