const niod_console = require("../utils/niod_console");

exports.connectToDcsServer = (socket, host, port) => {
  try {
    socket.connect(
      {
        host: host,
        port: port
      },
      () => {
        niod_console.log("Connected DCS NIOD server");
        failedConnections = 0;

        socket.on("data", data => {
          niod_console.log("Received: " + data);
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
