var net = require("net");
const express = require("express");
const app = express();

var db = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/";

const _PORT = 15487;
const _HOST = "127.0.0.1";

var client = new net.Socket();

client.connect(
  _PORT,
  _HOST,
  () => {
    console.log("Connected");
    client.write("Hello, server!");
  }
);

client.on("data", data => {
  console.log("Received: " + data);
});

client.on("close", () => {
  console.log("Connection closed");
});

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
