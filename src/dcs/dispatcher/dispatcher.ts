import Dispatch from "./types/dispatch";
import ToBeDispatched from "./types/to_be_dispatched";
import Event from "../game/types/callback/event";
import Function from "../game/types/callback/function";

const dispatchList: Map<String, Dispatch> = new Map();

const verifiyInputDispatch = (dispatch: Dispatch): Dispatch => {
  if (
    dispatch &&
    dispatch.data &&
    dispatch.callback &&
    typeof dispatch.callback === "function"
  ) {
    return dispatch;
  } else throw Error("Invalid input dispatch properties");
};

const verifyDispatchPayload = (
  dispatch: ToBeDispatched
): Function | Event | undefined => {
  if (dispatch && dispatch.data && dispatch.callbackId && dispatch.type) {
    if (dispatch.type === "function") {
      const func: Function = {
        data: dispatch.data,
        type: dispatch.type,
        callbackId: dispatch.type
      };
      return func;
    } else if (dispatch.type === "event") {
      const event: Event = {
        data: dispatch.data,
        type: dispatch.type,
        name: dispatch.callbackId
      };
      return event;
    }
  } else {
    throw Error("Invalid payload dispatch properties");
  }
};

const getDispatch = (func: Function): Dispatch => {
  const dispatch = dispatchList.get(func.callbackId);
  if (dispatch) {
    func.callback = dispatch.callback;
    return dispatch;
  } else {
    throw Error("Couldn't find callback, aborting");
  }
};

const addDispatch = (dispatch: Dispatch): Dispatch => {
  if (!dispatch)
    throw Error("Couldn't add dispatch because it's probably invalid");
  const callbackId =
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9); // To generate a (kinda) unique random uid
  dispatch.callbackId = callbackId;
  dispatchList.set(dispatch.callbackId, dispatch);
  return dispatch;
};

const removeDispatch = (dispatchObject: Dispatch) => {
  const result = dispatchList.delete(dispatchObject.callbackId);
  if (!result) {
    console.log(`Couldnt find any entry for id ${dispatchObject.callbackId}`);
  }
};

const displayDispatchList = () => {
  console.log(dispatchList);
};

export {
  verifiyInputDispatch,
  verifyDispatchPayload,
  getDispatch,
  addDispatch,
  removeDispatch,
  displayDispatchList
};
