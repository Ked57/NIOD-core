const niod_console = require("../../utils/niod_console");

exports.connectToDcsServer = (socket, host, port, messageMgr) => {
  return new Promise((resolve, reject) => {
    try {
      socket.connect(
        {
          host: host,
          port: port
        },
        () => {
          niod_console.log("Connected to DCS NIOD server");
          resolve();
        }
      );
    } catch (e) {
      handleError(e, socket, host, port, messageMgr);
    }
    socket.on("error", e => {
      handleError(e, socket, host, port, messageMgr);
    });
    socket.on("data", JSONData => {
      handleMsg(messageMgr, JSONData);
    });
    socket.on("close", handleClose);
    messageMgr.on("dcsSend", args => {
      niod_console.log(args);
      messageMgr.emit("niod_addDispatch", args);
    });

    messageMgr.on("dcsSend_callbackDispatched", dataToSend => {
      try {
        socket.write(JSON.stringify(dataToSend));
        niod_console.log("Emitted data");
      } catch (e) {
        niod_console.error(`Couldn't sent data: ${e}`);
      }
    });
  });
};

function handleError(e, socket, host, port, messageMgr) {
  niod_console.error(e.message);
  setTimeout(() => {
    try {
      socket.connect(
        {
          host: host,
          port: port
        },
        () => {
          niod_console.log("Connected to DCS NIOD server");
        }
      );
    } catch (e) {
      handleError(e, socket, host, port, messageMgr);
    }
  }, 5000);
}

function handleClose() {
  niod_console.log("Server closed connection");
}

function handleMsg(eventMgr, JSONData) {
  niod_console.log("Received data");
  niod_console.logObject(JSONData);
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
    niod_console.error("Catched an error during message handling");
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
