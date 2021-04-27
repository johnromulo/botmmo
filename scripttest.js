const robot = require("robotjs");
const sleep = require("./src/utils/sleep");
const { moveStep } = require("./src/utils/steps");
const { loopFarm } = require("./src/farms/money/loopFarm");
const configs = require("./config.json");


async function run() {
  await sleep(4);
  console.log("run")


  for (let num of Array.from(Array(5).keys())) {
    await loopFarm();
  }





  await loopFarm();
  // robot.keyToggle(configs.keys.left, "down");
  // // await sleep(0.01);
  // robot.keyToggle(configs.keys.left, "up");

  // robot.keyToggle(configs.keys.left, "down");
  // // await sleep(0.01);
  // robot.keyToggle(configs.keys.left, "up");

  // robot.keyToggle(configs.keys.left, "down");
  // await sleep(0.01);
  // robot.keyToggle(configs.keys.left, "up");

}


run();
