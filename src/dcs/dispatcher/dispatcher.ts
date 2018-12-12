import Dispatch from "./interfaces/dispatch";
import ToBeDispatched from "./interfaces/to_be_dispatched";
import Event from "../game/interfaces/callback/event";
import Function from "../game/interfaces/callback/function";

const dispatchList: Dispatch[] = [];

const verifiyInputDispatch = (dispatch: Dispatch) => {
  return new Promise<Dispatch>((resolve, reject) => {
    console.log("Received niod_addDispatch with dispatch:");
    console.log(dispatch);
    if (
      dispatch &&
      dispatch.data &&
      dispatch.callback &&
      typeof dispatch.callback === "function"
    ) {
      console.log("Data check passed");
      resolve(dispatch);
    } else reject("Invalid input dispatch properties");
  });
};

const verifyDispatchPayload = (dispatch: ToBeDispatched) => {
  return new Promise<Function | Event>((resolve, reject) => {
    console.log("Received niod_dispatch with dispatch:");
    console.log(dispatch);
    if (dispatch && dispatch.data && dispatch.callbackId && dispatch.type) {
      console.log("Data check passed");
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
    console.log("Dispatching");
    const dispatch = dispatchList.find(dispatchObject => {
      return dispatchObject.callbackId === func.callbackId;
    });
    if (dispatch) {
      func.callback = dispatch.callback;
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
        .substr(2, 9); // To generate an unique random uid
    dispatch.callbackId = callbackId;
    dispatchList.push(dispatch);
    console.log(`Sucessfuly pushed callback with id: ${callbackId}`);
    resolve(dispatch);
  });
};

const removeDispatch = (dispatchObject: Dispatch) => {
  const index = dispatchList.indexOf(dispatchObject);
  if (index) {
    dispatchList.splice(index, 1);
    console.log(`removed dispatch id ${dispatchObject.callbackId}`);
  } else {
    console.log(`Couldnt find index for id ${dispatchObject.callbackId}`);
  }
};

const dispatcher = {
  verifiyInputDispatch: verifiyInputDispatch,
  verifyDispatchPayload: verifyDispatchPayload,
  getDispatch: getDispatch,
  addDispatch: addDispatch,
  removeDispatch: removeDispatch
};

export default dispatcher;
