import Dispatch from "./types/dispatch";
import ToBeDispatched from "./types/to_be_dispatched";
import Event from "../game/types/callback/event";
import Function from "../game/types/callback/function";

const dispatchList: Map<String, Dispatch> = new Map();

const verifiyInputDispatch = (dispatch: Dispatch) => {
  return new Promise<Dispatch>((resolve, reject) => {
    if (
      dispatch &&
      dispatch.data &&
      dispatch.callback &&
      typeof dispatch.callback === "function"
    ) {
      resolve(dispatch);
    } else reject("Invalid input dispatch properties");
  });
};

const verifyDispatchPayload = (dispatch: ToBeDispatched) => {
  return new Promise<Function | Event>((resolve, reject) => {
    if (dispatch && dispatch.data && dispatch.callbackId && dispatch.type) {
      if (dispatch.type === "function") {
        const func: Function = {
          data: dispatch.data,
          type: dispatch.type,
          callbackId: dispatch.type
        };
        return resolve(func);
      } else if (dispatch.type === "event") {
        const event: Event = {
          data: dispatch.data,
          type: dispatch.type,
          name: dispatch.callbackId
        };
        resolve(event);
      }
    } else {
      reject("Invalid payload dispatch properties");
    }
  });
};

const getDispatch = (func: Function) => {
  return new Promise<Function>((resolve, reject) => {
    const dispatch = dispatchList.get(func.callbackId);
    if (dispatch) {
      func.callback = dispatch.callback;
      removeDispatch(dispatch);
      resolve(func);
    } else {
      reject("Couldn't find callback, aborting");
    }
  });
};

const addDispatch = (dispatch: Dispatch) => {
  return new Promise<Dispatch>((resolve, reject) => {
    if (!dispatch)
      reject("Couldn't add dispatch because it's probably invalid");
    const callbackId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9); // To generate a (kinda) unique random uid
    dispatch.callbackId = callbackId;
    dispatchList.set(dispatch.callbackId, dispatch);
    resolve(dispatch);
  });
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

const dispatcher = {
  verifiyInputDispatch: verifiyInputDispatch,
  verifyDispatchPayload: verifyDispatchPayload,
  getDispatch: getDispatch,
  addDispatch: addDispatch,
  removeDispatch: removeDispatch,
  displayDispatchList: displayDispatchList
};

export default dispatcher;
