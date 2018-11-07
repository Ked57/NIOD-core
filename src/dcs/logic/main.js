const niod_console = require("../../utils/niod_console");
const apiGetGroups = require("../../../api/get/groups");
const stateSaving = require("../../utils/state_saving");
let groups = "hola que tal";

exports.initNiod = messageMgr => {
  setInterval(() => {
    apiGetGroups.getGroupsFunction(messageMgr, 1, data => {
      niod_console.logObject(data, "Received this data");
      groups = data;
    });
  }, 2500);
  setInterval(() => {
    stateSaving.saveState(groups);
  }, 5000);
};
