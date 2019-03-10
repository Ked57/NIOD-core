import * as net from "net";
import InputPayload from "./types/input_payload";
import { Observable, Observer } from "rxjs";
import { Socket } from "net";

let connected: Observer<Boolean>;
const connectedObservable: Observable<Boolean> = Observable.create(
  (observer: Observer<Boolean>) => {
    observer.next(false);
    connected = observer;
  }
);
let connecting = false;
let socket: net.Socket;

const connect = (
  options: net.NetConnectOpts,
  onData: (data: any) => void
): [Socket, Observable<Boolean>] => {
  connecting = true;
  createConnection(options);

  socket.setTimeout(1000 * 60 * 5); // 5 minutes
  socket.setEncoding("utf8");
  socket.setKeepAlive(true, 1000); // 1 sec
  // When disconnected.
  socket.once("end", function() {
    console.error("Client socket disconnect. ");
    connected.next(false);
    if (!connecting) {
      setTimeout(
        () =>
          connect(
            options,
            onData
          ),
        1000
      );
    }
  });

  socket.once("timeout", function() {
    console.log("Client connection timeout. ");
    connected.next(false);
    if (!connecting) {
      setTimeout(
        () =>
          connect(
            options,
            onData
          ),
        1000
      );
    }
  });

  socket.once("error", function(err) {
    console.error(JSON.stringify(err));
    connected.next(false);
    connecting = false;
    setTimeout(
      () =>
        connect(
          options,
          onData
        ),
      1000
    );
  });

  socket.on("data", onData);

  return [socket, connectedObservable];
};

const createConnection = (options: net.NetConnectOpts) => {
  try {
    socket = net.createConnection(options, () => {
      console.log("Niod client connected");
      connected.next(true);
      connecting = false;
    });
  } catch (err) {
    console.error(err);
  }
};

const networkSend = (data: InputPayload) => {
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

export { connect, networkSend, isConnected, connected, connecting };
