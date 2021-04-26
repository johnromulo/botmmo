const robot = require("robotjs");
const sleep = require("../utils/sleep");
const customKeyTap = require("../utils/customKeyTap");

async function moveStep(direction, qt_steps) {
  for (let num of Array.from(Array(qt_steps).keys())) {
    robot.keyToggle(direction, "down");
    await sleep(0.001);
    robot.keyToggle(direction, "up");
  }
}

async function moveBike(direction, time) {
  robot.keyToggle(direction, "down");
  await sleep(time);
  robot.keyToggle(direction, "up");
}

module.exports = { moveStep, moveBike };

