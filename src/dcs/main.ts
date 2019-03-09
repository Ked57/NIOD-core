import * as net from "net";
import { validatePayload, dataFromDcsJsonToObject } from "./payload_validator";
import { connect, isConnected, networkSend } from "./network/network_manager";
import {
  addDispatch,
  verifiyInputDispatch,
  getDispatch,
  removeDispatch
} from "./dispatcher/dispatcher";
import Dispatch from "./dispatcher/types/dispatch";
import Callback from "./dispatcher/types/callback";
import InputPayload from "./network/types/input_payload";
import Event from "./game/types/callback/event";
import Function from "./game/types/callback/function";
import { Socket } from "net";
import { Observable } from "rxjs";
import Trigger from "./game/types/callback/trigger";

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

let socket: Socket;

const initDCSModule = () => {
  const [s, connected]: [Socket, Observable<Boolean>] = connect(options);
  socket = s;

  socket.on("data", function(data) {
    console.log("Server return data");
    const receivedData = dataFromDcsJsonToObject(data.toString());
    console.log(receivedData);
    receive(receivedData);
  });
  return connected;
};

const formPaylaod = (dispatch: Dispatch, type: string) => {
  return {
    type,
    callbackId: dispatch.callbackId,
    data: dispatch.data
  } as InputPayload;
};

const send = (
  data: { [key: string]: any },
  callback: Callback,
  type: string
) => {
  return new Promise(async (resolve, reject) => {
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
        formPaylaod(
          await addDispatch(await verifiyInputDispatch(dispatch)),
          type
        )
      );
    } catch (err) {
      console.error(err);
    }
  });
};

const receive = async (data: { [key: string]: any }) => {
  try {
    await handlePayload(await validatePayload(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const payloadIsFunction = (payload: any): payload is Function =>
  payload.type === "function";
const payloadIsTrigger = (payload: any): payload is Trigger =>
  payload.type === "trigger";
const payloadIsTriggerInit = (payload: any): payload is unknown =>
  payload.type === "triggerInit";

const handlePayload = (payload: Event | Function) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      if (payloadIsFunction(payload)) {
        const dispatch = await getDispatch(payload);
        removeDispatch(dispatch);
        resolve(dispatch.callback(payload.data));
      } else if (payloadIsTrigger(payload)) {
        const dispatch = await getDispatch(payload);
        resolve(dispatch.callback(payload.data));
      } else if (payloadIsTriggerInit(payload)) {
        resolve("Trigger added");
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
