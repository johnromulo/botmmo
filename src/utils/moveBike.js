const robot = require("robotjs");
const sleep = require("./sleep");

async function moveBike(direction, time) {
  robot.keyToggle(direction, "down");
  await sleep(time || 0);
  robot.keyToggle(direction, "up");
}

module.exports = moveBike;
