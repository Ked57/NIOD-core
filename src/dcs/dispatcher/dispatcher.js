const niod_console = require("../../utils/niod_console");

exports.initDispatcher = (messageMgr, dispatchList) => {
  messageMgr.on("niod_dispatch", dispatchData => {
    niod_console.logObject(
      dispatchData,
      "Received niod_dispatch with dispatchData:"
    );
    if (
      dispatchData.hasOwnProperty("data") &&
      dispatchData.data != null &&
      dispatchData.hasOwnProperty("callbackId") &&
      dispatchData.callbackId != null
    ) {
      niod_console.log("Data check passed");
      dispatch(dispatchList, dispatchData.data, dispatchData.callbackId);
    } else {
      niod_console.error(
        "Could not dispatch received data because it lacks properties or theeses properties are null"
      );
      return;
    }
  });
  messageMgr.on("niod_addDispatch", dispatchData => {
    niod_console.logObject(
      dispatchData,
      "Received niod_addDispatch with dispatchData:"
    );
    if (
      dispatchData.hasOwnProperty("data") &&
      dispatchData.data != null &&
      dispatchData.hasOwnProperty("callback") &&
      dispatchData.callback != null &&
      typeof dispatchData.callback === "function"
    ) {
      niod_console.log("Data check passed");
      addDispatch(dispatchList, dispatchData.data, dispatchData.callback);
    }
  });
};

function dispatch(dispatchList, data, callbackId) {
  niod_console.log("Dispatching");
  for (const dispatchObject of dispatchList) {
    if (dispatchObject.callbackId === callbackId) {
      niod_console.log("Found callback, executing");
      dispatchObject.callback(data);
      return;
    }
  }
  niod_console.log("Couldn't find callback, aborting");
}

function addDispatch(dispatchList, data, callback) {
  if (typeof callback === "function") {
    const callbackId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9); // To generate an unique random uid
    dispatchList.push({ callbackId: callbackId, data: data });
    niod_console.log(`Sucessfuly pushed callback with id: ${callbackId}`);
  } else {
    niod_console.error(`Couldn't push callback`);
  }
}
