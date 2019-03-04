import * as net from "net";
import payload_validator from "./payload_validator";
import { connect, isConnected, networkSend } from "./network/network_manager";
import {
  addDispatch,
  verifiyInputDispatch,
  getDispatch
} from "./dispatcher/dispatcher";
import Dispatch from "./dispatcher/types/dispatch";
import Callback from "./dispatcher/types/callback";
import InputPayload from "./network/types/input_payload";
import Event from "./game/types/callback/event";
import Function from "./game/types/callback/function";
import { saveGroups, getGroups } from "./game/game_manager";

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

let socket: net.Socket;

const initDCSModule = () => {
  socket = connect(options);

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
        name: "registerZone",
        args: {
          zoneName: "zone"
        }
      },
      data => console.log(data)
    );
  }, 2500);
};

const formPaylaod = (dispatch: Dispatch) => {
  return {
    type: "function",
    callbackId: dispatch.callbackId,
    data: dispatch.data
  } as InputPayload;
};

const send = async (data: { [key: string]: any }, callback: Callback) => {
  if (!isConnected() || !socket) {
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
    networkSend(
      socket,
      formPaylaod(await addDispatch(await verifiyInputDispatch(dispatch)))
    );
  } catch (err) {
    console.error(err);
  }
};

const receive = async (data: { [key: string]: any }) => {
  try {
    await handlePayload(await payload_validator.validatePayload(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const handlePayload = (payload: Event | Function) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      if (payload.type === "function") {
        const func = await getDispatch(payload as Function);
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

export { initDCSModule, send, receive };
