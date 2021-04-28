const robot = require("robotjs");
const sleep = require("../utils/sleep");
const configs = require("../../config.json");
const customKeyTap = require("../utils/customKeyTap");


async function moveStep(direction, qt_steps) {
  for (let num of Array.from(Array(qt_steps).keys())) {
    robot.keyToggle(direction, "down");
    await sleep(0.1);
    robot.keyToggle(direction, "up");
    await sleep(0.1);
  }
}

async function moveBike(direction, qt_steps) {
  if (qt_steps === 1) {
    console.log("moveBike1", direction);
    await customKeyTap(configs.keys.bike);
    robot.keyToggle(direction, "down");
    robot.keyToggle(direction, "up");
    await customKeyTap(configs.keys.bike);
  } else if (qt_steps % 2 === 0) {
    for (let num of Array.from(Array(qt_steps / 2).keys())) {
      console.log("moveBike2", direction, num);
      robot.keyToggle(direction, "down");
      robot.keyToggle(direction, "up");
    }
  } else if (qt_steps % 2 !== 0) {
    const result = qt_steps - 3;
    const arr = Array.from(Array((result / 2) + 1).keys());
    for (let num of arr) {
      if (arr.length === (num + 1)) {
        console.log("moveBike3 - S3", direction, num);
        robot.keyToggle(direction, "down");
        await sleep(0.05);
        robot.keyToggle(direction, "up");
        break;
      } else {
        console.log("moveBike3 - S2", direction, num);
        robot.keyToggle(direction, "down");
        robot.keyToggle(direction, "up");
      }
    }

  }
}

module.exports = { moveStep, moveBike };

