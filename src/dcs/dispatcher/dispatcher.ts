import DispatchPayload from "./interfaces/dispatch_payload";
import Dispatch from "./interfaces/dispatch";

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

const verifyDispatchPayload = (dispatch: DispatchPayload) => {
  return new Promise<DispatchPayload>((resolve, reject) => {
    console.log("Received niod_dispatch with dispatch:");
    console.log(dispatch);
    if (dispatch && dispatch.data && dispatch.callbackId) {
      console.log("Data check passed");
      return resolve(dispatch);
    } else {
      reject("Invalid payload dispatch properties");
    }
  });
};

const executeDispatch = (
  data: { [key: string]: string },
  callbackId: string
) => {
  return new Promise((resolve, reject) => {
    console.log("Dispatching");
    const dispatch = dispatchList.find(dispatchObject => {
      return dispatchObject.callbackId === callbackId;
    });

    if (dispatch) {
      try {
        dispatch.callback(data);
        resolve(dispatch);
      } catch (error) {
        console.error("Error while calling callback");
        console.error(error);
        reject();
      }
    } else {
      console.log("Couldn't find callback, aborting");
      reject();
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
  executeDispatch: executeDispatch,
  addDispatch: addDispatch,
  removeDispatch: removeDispatch
};

export default dispatcher;
