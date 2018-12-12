import * as net from "net";
import payload_validator from "./payload_validator";
import network_manager from "./network/network_manager";
import dispatcher from "./dispatcher/dispatcher";
import Dispatch from "./dispatcher/interfaces/dispatch";
import Callback from "./dispatcher/interfaces/callback";
import InputPayload from "./network/interfaces/input_payload";
import Event from "./game/interfaces/callback/event";
import Function from "./game/interfaces/callback/function";
import game_manager from "./game/game_manager";

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

let socket: net.Socket;

const initDCSModule = () => {
  socket = network_manager.connect(options);

  socket.on("data", function(data) {
    console.log("Server return data");
    const receivedData = payload_validator.dataFromDcsJsonToObject(
      data.toString()
    );
    console.log(receivedData);
    receive(receivedData);
  });

  setTimeout(() => {
    send(
      {
        name: "getGroups",
        args: [2]
      },
      data => game_manager.saveGroups(data)
    );
  }, 2500);
  setTimeout(() => {
    console.log(game_manager.getGroups());
  }, 3000);
};

const formPaylaod = (dispatch: Dispatch) => {
  return {
    type: "function",
    callbackId: dispatch.callbackId,
    data: dispatch.data
  } as InputPayload;
};
const send = async (data: { [key: string]: any }, callback: Callback) => {
  if (!network_manager.isConnected() || !socket) {
    console.error(
      "Error trying to send something: Network isn't connected or socket is empty, aborting"
    );
    return;
  }
  const dispatch: Dispatch = {
    data: data,
    callback: callback,
    callbackId: ""
  };

  try {
    network_manager.send(
      socket,
      formPaylaod(
        await dispatcher.addDispatch(
          await dispatcher.verifiyInputDispatch(dispatch)
        )
      )
    );
  } catch (err) {
    console.error(err);
  }
};

const receive = async (data: { [key: string]: any }) => {
  try {
    await handlePayload(await payload_validator.validatePayload(data));
  } catch (err) {
    console.error(err);
  }
};

const handlePayload = (payload: Event | Function) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      if (payload.type === "function") {
        const func = await dispatcher.getDispatch(payload as Function);
        if (func.callback) {
          resolve(func.callback(func.data));
        } else reject("Couldn't find any callback function to execute");
      } /*else if(payload.type === "event"){
        // TODO: Handle the event and return the function that will call every subscriber 
        resolve(eventDispatcher);
      }*/ else {
        reject("Couldnt dispatch the received payload");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const DCSModule = {
  init: initDCSModule,
  send: send
};

export default DCSModule;
