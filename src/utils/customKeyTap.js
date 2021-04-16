const robot = require("robotjs");
const sleep = require("./sleep");

async function customKeyTap(direction) {
  robot.keyToggle(direction, "down");
  await sleep(0.05);
  robot.keyToggle(direction, "up");
}

module.exports = customKeyTap;
