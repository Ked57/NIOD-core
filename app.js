const net = require("net");
const express = require("express");
const net_functions = require("./src/dcs/logic/net");
const configuration = require("./src/utils/config");
const niod_console = require("./src/utils/niod_console");
const dcsEventHandler = require("./src/dcs/message/messageHandler");
const dcsDispatcher = require("./src/dcs/dispatcher/dispatcher");
const eventEmitter = require("events").EventEmitter;
class messageMgrClass extends eventEmitter {}

const app = express();

const socket = new net.Socket();
const config = configuration.config;
const messageMgr = new messageMgrClass();
let dispatchList = [];

configuration.loadConfig();
niod_console.logObject(config, "Config object:");
dcsEventHandler.initEventHandling(messageMgr);
dcsDispatcher.initDispatcher(messageMgr, dispatchList);

net_functions.connectToDcsServer(
  socket,
  config.DCS_HOST,
  config.DCS_PORT,
  messageMgr
);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  niod_console.log("NIOD web app listening on port 3000!");
});
