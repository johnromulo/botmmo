const robot = require("robotjs");
const sleep = require("./src/utils/sleep");
const { moveStep, moveBike } = require("./src/utils/steps");
const { goToFarm } = require("./src/farms/money/goToFarm");
const { exitCenter } = require("./src/farms/money/exitCenter");
const { goToCenter } = require("./src/game/goToCenter");
const configs = require("./config.json");


async function run() {
  await sleep(4);
  console.log("run")

  await goToCenter();
  await exitCenter();
  await goToFarm();

  console.log("fim")

  await run();
}


run();
