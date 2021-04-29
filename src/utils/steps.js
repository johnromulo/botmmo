const robot = require("robotjs");
const sleep = require("../utils/sleep");
// const configs = require("../../config.json");
// const customKeyTap = require("../utils/customKeyTap");

async function moveStep(direction, qt_steps) {
  for (let num of Array.from(Array(qt_steps).keys())) {
    robot.keyToggle(direction, "down");
    await sleep(0.1);
    robot.keyToggle(direction, "up");
    await sleep(1);
  }
}

async function moveBike(direction, qt_steps) {
  robot.keyToggle(direction, "down");
  await sleep(qt_steps / 12);
  robot.keyToggle(direction, "up");
}

module.exports = { moveStep, moveBike };
