const robot = require("robotjs");
const sleep = require("../utils/sleep");
const configs = require("../../config.json");

async function healCenter() {
  robot.keyToggle(configs.keys.button_z, "down");
  await sleep(4.5);
  robot.keyToggle(configs.keys.button_z, "up");
}

module.exports = { healCenter };
