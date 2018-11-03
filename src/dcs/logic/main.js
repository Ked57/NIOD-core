const niod_console = require("../../utils/niod_console");

exports.initNiod = messageMgr => {
  setInterval(() => {
    messageMgr.emit("dcsSend", {
      type: "function",
      callback: getGroupsCallback,
      data: {
        name: "getGroups",
        args: [1]
      }
    });
  }, 5000);
};

const getGroupsCallback = () => {
  niod_console.log("this is getGroupsCallback");
};
