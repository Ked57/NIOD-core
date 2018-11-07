const fs = require("fs");
const niod_console = require("./niod_console");

exports.config = {
  APP_LOG: true,
  APP_LOG_TO_FILE: true,
  APP_LOG_PATH: "./log/niod.log",
  APP_SAVE_STATE: true,
  APP_SAVE_STATE_PATH: "save.json",
  APP_GET_GROUPS_INTERVAL: 2500,
  APP_STATE_SAVING_INTERVAL: 5000,

  DCS_PORT: 15488,
  DCS_HOST: "localhost",

  API_GET_GROUPS: true
};

exports.loadConfig = () => {
  let configData = {};
  try {
    const configJSON = fs.readFileSync("config.json");
    configData = JSON.parse(configJSON);
  } catch (e) {
    niod_console.error(e);
    return;
  }
  for (const property of Object.keys(this.config)) {
    if (configData.property) {
      this.config[property] = configData[property];
    }
  }
  niod_console.log("Config file loaded");
};
