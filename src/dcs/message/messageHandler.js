const niod_console = require("../../utils/niod_console");
const net_functions = require("../logic/net");

let socket = null;

exports.initEventHandling = (messageMgr, sock) => {
  socket = sock;
  messageMgr.on("dcsResponse_getGroups", handleDcsReponseGetGroups);
  messageMgr.on("dcsSend_getGroups", handleDcsSendGetGroups);
};

function handleDcsReponseGetGroups(dcsResponse) {
  niod_console.logObject(
    dcsResponse,
    "dcsResponse_getGroups got this as an answer"
  );
}

function handleDcsSendGetGroups(package) {
  socket;
}
