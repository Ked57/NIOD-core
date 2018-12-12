import * as net from "net";
import InputPayload from "./interfaces/input_payload";

let connected = false;
let connecting = false;

const connect = (options: net.NetConnectOpts) => {
  connecting = true;
  const socket = net.createConnection(options, () => {
    console.log("Niod client connected");
    connected = true;
    connecting = false;
  });

  socket.setTimeout(1000 * 60 * 5); //5 minutes
  socket.setEncoding("utf8");
  socket.setKeepAlive(true, 1000); //1 sec
  // When connection disconnected.
  socket.once("end", function() {
    console.log("Client socket disconnect. ");
    connected = false;
  });

  socket.once("close", function() {
    console.log("Client socket closed. ");
    connected = false;
  });

  socket.once("timeout", function() {
    console.log("Client connection timeout. ");
    connected = false;
  });

  socket.once("error", function(err) {
    console.error(JSON.stringify(err));
    connected = false;
  });

  return socket;
};

const send = (socket: net.Socket, data: InputPayload) => {
  if (!isConnected) {
    console.error("ERR: Socket isn't connected, aborting;");
    return;
  }
  const jsonData = JSON.stringify(data);
  socket.write(jsonData + "\n", () =>
    console.log(`Successfuly sent ${jsonData}`)
  );
};

const isConnected = () => {
  return connected;
};

const network_manager = {
  connect: connect,
  send: send,
  isConnected: isConnected,
  connected: connected,
  connecting: connecting
};

export default network_manager;
