const robot = require("robotjs");
const sleep = require("./src/utils/sleep");
const { moveStep, moveBike } = require("./src/utils/steps");
const { goToFarm } = require("./src/farms/money/goToFarm");
const { exitCenter } = require("./src/farms/money/exitCenter");
const { loopFarm } = require("./src/farms/money/loopFarm");
const { goToCenter } = require("./src/game/goToCenter");
const configs = require("./config.json");

async function run() {
  await sleep(4);
  console.log("run");

  // console.time("Type 100 numeric chars");
  // console.time("Type 100 numeric chars");
  // await goToCenter();
  // await exitCenter();
  // await goToFarm();
  // console.timeEnd("Type 100 numeric chars");

  console.time("Type 100 numeric chars");
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  await loopFarm();
  // await moveStep(configs.keys.right, 7);
  console.timeEnd("Type 100 numeric chars");

  // console.log("fim");

  // await run();

  // robot.setKeyboardDelay(1);
  // console.time("Type 100 numeric chars");
  // robot.typeString(
  //   "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"
  // );
  // console.timeEnd("Type 100 numeric chars");
  // console.time("Type 100 alphabetic chars");
  // robot.typeString(
  //   "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv"
  // );
  // console.timeEnd("Type 100 alphabetic chars");
}

run();
