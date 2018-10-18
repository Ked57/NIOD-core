const net = require("net");
const express = require("express");
const net_functions = require("./src/dcs/functions/net_functions");
const configuration = require("./src/utils/config");
const niod_console = require("./src/utils/niod_console");
const dcsEventHandler = require("./src/dcs/functions/eventHandler");
const dcsDispatcher = require("./src/dcs/functions/dispatcher");
const eventEmitter = require("events").EventEmitter;
class EvenMgrClass extends eventEmitter {}

const app = express();

const socket = new net.Socket();
const config = configuration.config;
const eventMgr = new EvenMgrClass();
let dispatchList = [];
//test only
dispatchList.push({
  type: "function",
  callbackId: "anIdForTheCallback",
  callback: data => {
    niod_console.log("executing the callback: ");
    niod_console.logObject(data, "");
  }
});

configuration.loadConfig();
niod_console.logObject(config, "Config object:");
dcsEventHandler.initEventHandling(eventMgr);
dcsDispatcher.initDispatcher(eventMgr, dispatchList);

net_functions.connectToDcsServer(
  socket,
  config.DCS_HOST,
  config.DCS_PORT,
  eventMgr
);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  niod_console.log("NIOD web app listening on port 3000!");
});
