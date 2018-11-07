const niod_console = require("../../src/utils/niod_console");

const getGroupsCallback = () => {
  niod_console.log("this is getGroupsCallback");
};

exports.getGroupsCallback = getGroupsCallback;

exports.getGroupsFunction = (messageMgr, coalitionId, callback) => {
  messageMgr.emit("dcsSend", {
    type: "function",
    callback: callback,
    data: {
      name: "getGroups",
      args: [coalitionId]
    }
  });
  niod_console.log("emitted dcsSend function");
};
