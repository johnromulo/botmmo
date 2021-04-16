const robot = require("robotjs");
const sleep = require("./sleep");
const configs = require("../../config.json");

async function customKeyTap(direction) {
  robot.keyToggle(direction, "down");
  await sleep(configs.speed_prees_button);
  robot.keyToggle(direction, "up");
}

module.exports = customKeyTap;
