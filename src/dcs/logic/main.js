const niod_console = require("../../utils/niod_console");
const apiGetGroups = require("../../../api/get/groups");

exports.initNiod = messageMgr => {
  setInterval(() => {
    apiGetGroups.getGroupsFunction(messageMgr, 1);
  }, 5000);
};
