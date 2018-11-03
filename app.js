const net = require("net");
const express = require("express");
const net_functions = require("./src/dcs/logic/net");
const configuration = require("./src/utils/config");
const niod_console = require("./src/utils/niod_console");
const dcsDispatcher = require("./src/dcs/dispatcher/dispatcher");
const api = require("./api/api");
const main = require("./src/dcs/logic/main");
const eventEmitter = require("events").EventEmitter;
class messageMgrClass extends eventEmitter {}

const app = express();

const socket = new net.Socket();
const config = configuration.config;
const messageMgr = new messageMgrClass();
let dispatchList = [];

configuration.loadConfig();
niod_console.logObject(config, "Config object:");
dcsDispatcher.initDispatcher(messageMgr, dispatchList);

let apiFunctions = [];
api.initApi(config, apiFunctions, app, messageMgr);

net_functions
  .connectToDcsServer(socket, config.DCS_HOST, config.DCS_PORT, messageMgr)
  .then(main.initNiod(messageMgr))
  .catch(e => niod_console.error(e));

app.listen(3000, function() {
  niod_console.log("NIOD web app listening on port 3000!");
});
