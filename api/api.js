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
  app.get("/get/groups/:coalitionId", (req, res) => {
    const coalitionId = req.params.coalitionId;
    if (coalitionId) {
      apiFunctions["getGroups"](messageMgr, coalitionId, data => {
        res.send(JSON.stringify(data));
      });
    } else {
      res.status(400);
    }
  });
};
