import * as net from "net";
import InputPayload from "./types/input_payload";
import { Observable, Observer } from "rxjs";

let connected: Boolean = false;
let connecting = false;
let socket: net.Socket;

const connect = (
  options: net.NetConnectOpts,
  onData: (data: any) => void
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connecting = true;
    const connectedObservable: Observable<Boolean> = new Observable(
      (observer: Observer<Boolean>) => {
        observer.next(false);
        createConnection(options, observer);

        socket.setTimeout(1000 * 60 * 1); // 1 minute
        socket.setEncoding("utf8");
        socket.setKeepAlive(true, 1000); // 1 sec
        // When disconnected.
        socket.once("end", function() {
          console.error("Client socket disconnect. ");
          observer.next(false);
          if (!connecting) {
            setTimeout(
              () =>
                connect(
                  options,
                  onData
                ),
              5000
            );
          }
        });

        socket.once("timeout", function() {
          console.log("Client connection timeout. ");
          observer.next(false);
          if (!connecting) {
            setTimeout(
              () =>
                connect(
                  options,
                  onData
                ),
              5000
            );
          }
        });

        socket.once("error", function(err) {
          console.error(JSON.stringify(err));
          observer.next(false);
          connecting = false;
          setTimeout(
            () =>
              connect(
                options,
                onData
              ),
            5000
          );
        });

        socket.on("data", onData);
      }
    );
    connectedObservable.subscribe({
      next: value => (value ? resolve() : {}),
      error: err => console.error(err)
    });
  });
};

const createConnection = (
  options: net.NetConnectOpts,
  observer: Observer<Boolean>
) => {
  try {
    socket = net.createConnection(options, () => {
      console.log("Niod client connected");
      observer.next(true);
      connecting = false;
      connected = true;
    });
  } catch (err) {
    console.error(err);
  }
};

const networkSend = (data: InputPayload) => {
  if (!isConnected) {
    throw Error("ERR: Socket isn't connected, aborting;");
  }
  if (!data) {
    console.error("ERROR: payload is empty, nothing was sent", data);
    return;
  }
  const jsonData = JSON.stringify(data);
  socket.write(jsonData + "\n", () => {});
};

const isConnected = () => {
  return connected;
};

export { connect, networkSend, isConnected, connecting };
