const niod_console = require("../../utils/niod_console");

exports.initDispatcher = (messageMgr, dispatchList) => {
  messageMgr.on("niod_dispatch", dispatchData => {
    niod_console.logObject(
      dispatchData,
      "Received niod_dispatch with dispatchData:"
    );
    if (dispatchData && dispatchData.data && dispatchData.callbackId) {
      niod_console.log("Data check passed");
      dispatch(dispatchList, dispatchData.data, dispatchData.callbackId);
    } else {
      niod_console.error(
        "Could not dispatch received data because it lacks properties or theeses properties are null"
      );
    }
  });
  messageMgr.on("niod_addDispatch", dispatchData => {
    niod_console.logObject(
      dispatchData,
      "Received niod_addDispatch with dispatchData:"
    );
    if (
      dispatchData &&
      dispatchData.data &&
      dispatchData.callback &&
      typeof dispatchData.callback === "function"
    ) {
      niod_console.log("Data check passed");
      addDispatch(dispatchList, dispatchData.data, dispatchData.callback)
        .then(callbackId => {
          messageMgr.emit("dcsSend_callbackDispatched", {
            type: "function",
            callbackId: callbackId,
            data: dispatchData.data
          });
        })
        .catch(e => niod_console.error(e));
    }
  });
};

function dispatch(dispatchList, data, callbackId) {
  niod_console.log("Dispatching");
  niod_console.logObject(dispatchList);
  const dispatch = dispatchList.find(dispatchObject => {
    return dispatchObject.callbackId === callbackId;
  });

  if (dispatch) {
    niod_console.log("Found callback, executing");
    niod_console.log(dispatch.callback);
    try {
      dispatch.callback(data);
      removeDispatch(dispatchList, dispatch);
    } catch {
      niod_console.error("calling callback or removing dispatch");
    }
  } else {
    niod_console.log("Couldn't find callback, aborting");
  }
}

function addDispatch(dispatchList, data, callback) {
  return new Promise((resolve, reject) => {
    const callbackId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9); // To generate an unique random uid
    dispatchList.push({
      callbackId: callbackId,
      data: data,
      callback: callback
    });
    niod_console.log(`Sucessfuly pushed callback with id: ${callbackId}`);
    resolve(callbackId);
  });
}

const removeDispatch = (dispatchList, dispatchObject) => {
  niod_console.log(`removed dispatch id ${dispatchObject.callbackId}`);
  dispatchList = dispatchList.filter(
    dispatch => dispatch.callbackId === dispatchObject.callbackId
  );
};
