import * as net from "net";
import { validatePayload, dataFromDcsJsonToObject } from "./payload_validator";
import { connect, networkSend } from "./network/network_manager";
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
import Trigger from "./game/types/callback/trigger";
import NoTimeout from "./game/types/callback/no_timeout";
import GroupInfo from "./game/types/callback/group_info";
import { storeGroupInfo } from "./store/store_group_info";
import { enQueue, initQueue } from "./queue/queue";

const options = {
  port: 15487,
  host: "localhost"
} as net.TcpSocketConnectOpts;

const initDCSModule = () => {
  initQueue();
  return connect(
    options,
    (data: any) => receive(dataFromDcsJsonToObject(data.toString()))
  );
};

const formPaylaod = (dispatch: Dispatch, type: string) => {
  return {
    type,
    callbackId: dispatch.callbackId,
    data: dispatch.data
  } as InputPayload;
};

const send = async (
  data: { [key: string]: any },
  callback: Callback,
  type: string
) => {
  const dispatch: Dispatch = {
    data: data,
    callback: callback,
    callbackId: ""
  };

  try {
    enQueue(
      formPaylaod(await addDispatch(await verifiyInputDispatch(dispatch)), type)
    );
  } catch (err) {
    console.error(err);
  }
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
const payloadIsNoTimeout = (payload: any): payload is NoTimeout =>
  payload.type === "noTimeout";
const payloadIsGroupInfo = (payload: any): payload is GroupInfo =>
  payload.type === "groupInfo";

const handlePayload = async (
  payload: Event | Function | Trigger | NoTimeout | GroupInfo | unknown
) => {
  try {
    if (payloadIsFunction(payload)) {
      const dispatch = await getDispatch(payload);
      removeDispatch(dispatch);
      return dispatch.callback(payload.data);
    } else if (payloadIsTrigger(payload)) {
      const dispatch = await getDispatch(payload);
      return dispatch.callback(payload.data);
    } else if (payloadIsTriggerInit(payload)) {
      return "Trigger added";
    } else if (payloadIsNoTimeout(payload)) {
      return;
    } else if (payloadIsGroupInfo(payload)) {
      return storeGroupInfo(payload);
    } /*else if(payload.type === "event"){
        // TODO: Handle the event and return the function that will call every subscriber
        resolve(eventDispatcher);
      }*/ else {
      throw Error("Couldnt dispatch the received payload");
    }
  } catch (err) {
    throw Error(err);
  }
};

export { initDCSModule, send, receive };
