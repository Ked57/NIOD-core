const fs = require("fs");
const niod_console = require("./niod_console");

exports.config = {
  APP_LOG: true,
  APP_LOG_TO_FILE: true,
  APP_LOG_PATH: "./log/niod.log",

  DCS_PORT: 15488,
  DCS_HOST: "127.0.0.1",

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
    if (configData.hasOwnProperty(property)) {
      this.config[property] = configData[property];
    }
  }
  niod_console.log("Config file loaded");
};
