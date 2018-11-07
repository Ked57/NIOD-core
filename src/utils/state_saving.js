const config = require("./config").config;
const niod_console = require("./niod_console");
const fs = require("fs");

const saveState = groups => {
  niod_console.log(config.APP_SAVE_STATE);
  if (!config.APP_SAVE_STATE) {
    niod_console.log("APP_SAVE_STATE disabled, aborting");
    return;
  }
  fs.writeFile(
    config.APP_SAVE_STATE_PATH,
    JSON.stringify(groups),
    "utf8",
    err => {
      if (err) {
        niod_console.error(
          "An error occured while writing JSON Object to File."
        );
        niod_console.error(err);
        return;
      }

      niod_console.log("JSON file has been saved.");
    }
  );
};

exports.saveState = saveState;
