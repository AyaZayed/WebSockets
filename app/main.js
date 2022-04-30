var socket = io.connect("http://localhost", { forceNew: true });
socket.on("messages", (data) => {
  console.info(data);
});
