const niod_console = require("../src/utils/niod_console");
const getGroups = require("./get/groups");

exports.initApi = (config, apiFunctions, app, messageMgr) => {
  if (config.API_GET_GROUPS) {
    apiFunctions["getGroups"] = getGroups.getGroupsFunction;
    niod_console.log("initialized getGroups function api");
  }

  initRouting(app, apiFunctions, messageMgr);
};

const initRouting = (app, apiFunctions, messageMgr) => {
  app.get("/", function(req, res) {
    res.send("docs go here!");
  });
  app.get("/get/groups", (req, res) => {
    const groups = apiFunctions["getGroups"](messageMgr, 2);
    res.send(JSON.stringify(groups));
  });
};
