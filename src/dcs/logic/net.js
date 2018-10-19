const niod_console = require("../../utils/niod_console");

exports.connectToDcsServer = (socket, host, port, messageMgr) => {
  try {
    socket.connect(
      {
        host: host,
        port: port
      },
      () => {
        niod_console.log("Connected DCS NIOD server");
        failedConnections = 0;

        socket.on("data", JSONData => {
          handleMsg(messageMgr, JSONData);
        });
        socket.on("close", handleClose);
        socket.on("error", handleError);
      }
    );
  } catch (e) {
    handleError(e);
  }
};

function handleError(e) {
  niod_console.error(e.message);
}

function handleClose() {
  niod_console.log("Server closed connection");
}

function handleMsg(eventMgr, JSONData) {
  niod_console.log("Received data" + JSONData.toString());
  try {
    const parsedJsonObject = JSON.parse(JSONData);
    if (
      parsedJsonObject.hasOwnProperty("callbackId") &&
      parsedJsonObject.hasOwnProperty("type") &&
      parsedJsonObject.hasOwnProperty("data")
    ) {
      switch (parsedJsonObject.type) {
        case "function":
          handleFunction(eventMgr, parsedJsonObject);
          break;
        default:
          niod_console.error("Received wrong object type, aborting ...");
          break;
      }
    }
  } catch (e) {
    niod_console.error(e);
    return;
  }
}

function handleFunction(eventMgr, parsedJsonObject) {
  niod_console.log(
    `Received data, callbackId is: ${parsedJsonObject.callbackId}`
  );
  eventMgr.emit("niod_dispatch", {
    callbackId: parsedJsonObject.callbackId,
    data: parsedJsonObject.data
  });
}
