const niod_console = require("../../utils/niod_console");
const apiGetGroups = require("../../../api/get/groups");
const stateSaving = require("../../utils/state_saving");
const config = require("../../utils/config").config;
let groups = "";

exports.initNiod = messageMgr => {
  setInterval(() => {
    apiGetGroups.getGroupsFunction(messageMgr, 1, data => {
      niod_console.logObject(data, "Received this data");
      groups = data;
    });
  }, config.APP_GET_GROUPS_INTERVAL || 2500);
  setInterval(() => {
    stateSaving.saveState(groups);
  }, config.APP_STATE_SAVING_INTERVAL || 5000);
};
