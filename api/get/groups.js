const niod_console = require("../../src/utils/niod_console");

const getGroupsCallback = () => {
  niod_console.log("this is getGroupsCallback");
};

exports.getGroupsFunction = (messageMgr, coalitionId) => {
  messageMgr.emit("dcsSend", {
    type: "function",
    callback: getGroupsCallback,
    data: {
      name: "getGroups",
      args: [coalitionId]
    }
  });
  niod_console.log("emitted dcsSend function");
};
