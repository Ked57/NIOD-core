const niod_console = require("../../utils/niod_console");

exports.initEventHandling = eventMgr => {
  eventMgr.on("dcsResponse_getGroups", handleDcsReponseGetGroups);
};

function handleDcsReponseGetGroups(dcsResponse) {
  niod_console.logObject(
    dcsResponse,
    "dcsResponse_getGroups got this as an answer"
  );
}
