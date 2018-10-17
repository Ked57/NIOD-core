const net = require("net");
const express = require("express");
const net_functions = require("./src/dcs/net_functions");
const configuration = require("./src/utils/config");
const niod_console = require("./src/utils/niod_console");
const db = require("mongodb").MongoClient;

const app = express();

const socket = new net.Socket();
const config = configuration.config;

configuration.loadConfig();
niod_console.logObject(config, "Config object:");

net_functions.connectToDcsServer(socket, config.DCS_HOST, config.DCS_PORT);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  niod_console.log("NIOD web app listening on port 3000!");
});
