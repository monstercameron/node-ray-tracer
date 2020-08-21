require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`From server: ${data}`);
      }
    });
  });
});

app.use(
  "/static",
  express.static("public", {
    setHeaders: (res, path, stat) => {
      res.set("Content-Type", "*/*");
    },
  })
);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`App listening on port: ${process.env.PORT}`);
});
