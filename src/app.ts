import * as express from "express";
import * as net from "net";
import DataFromDcsToJson from "./dcs/data_validator";
import network_manager from "./dcs/network_manager";
import { EventEmitter } from "events";
class Event extends EventEmitter {}

const app = express();

const events = new Event();

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

let socket = network_manager.connect(options);

// When receive server send back data.
socket.on("data", function(data) {
  console.log("Server return data : " + data);
});

setTimeout(
  () =>
    network_manager.send(socket, {
      type: "function",
      callbackId: "anIdForTheCallback",
      data: {
        name: "getGroups",
        args: [2]
      }
    }),
  2500
);
socket.on("data", data => console.log(DataFromDcsToJson(data.toString())));

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));
