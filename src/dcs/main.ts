import * as net from "net";
import dataFromDcsToJson from "./payload_validator";
import network_manager from "./network/network_manager";
import dispatcher from "./dispatcher/dispatcher";
import Dispatch from "./dispatcher/interfaces/dispatch";
import Callback from "./dispatcher/interfaces/callback";
import InputPayload from "./network/interfaces/input_payload";

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

let socket: net.Socket;

const initDCSModule = () => {
  socket = network_manager.connect(options);

  socket.on("data", function(data) {
    console.log("Server return data : ");
    console.log(dataFromDcsToJson(data.toString()));
  });

  setTimeout(
    () =>
      send(
        {
          name: "getGroups",
          args: [2]
        },
        () => console.log("got em")
      ),
    2500
  );
};

const formPaylaod = (dispatch: Dispatch) => {
  return {
    type: "function",
    callbackId: dispatch.callbackId,
    data: dispatch.data
  };
};
const send = async (data: { [key: string]: any }, callback: Callback) => {
  if (!network_manager.connected || !socket) return;
  const dispatch: Dispatch = {
    data: data,
    callback: callback
  };
  try {
    /*network_manager.send(
      socket,
      formPaylaod(
        await dispatcher.addDispatch(
          await dispatcher.verifiyInputDispatch(dispatch)
        )
      )
    );*/
  } catch (e) {
    console.error(e);
  }
};

const DCSModule = {
  init: initDCSModule,
  send: send
};

export default DCSModule;
