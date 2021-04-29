const robot = require("robotjs");
const sleep = require("./src/utils/sleep");
const { moveStep, moveBike } = require("./src/utils/steps");
const { goToFarm } = require("./src/farms/money/goToFarm");
const { exitCenter } = require("./src/farms/money/exitCenter");
const { loopFarmRoutePosition, loopFarm } = require("./src/farms/money/loopFarm");
const { goToCenter } = require("./src/game/goToCenter");
const configs = require("./config.json");

async function run() {


  await sleep(5);
  console.log("run");

  // robot.setKeyboardDelay(1);
  const step = 22;
  // for (let num of Array.from(Array(step).keys())) {
  //   console.log("num", num);
  //   console.time("tap");
  //   robot.keyToggle(configs.keys.left, "down");
  //   await sleep(0.1);
  //   robot.keyToggle(configs.keys.left, "up");
  //   await sleep(0.2);
  //   console.timeEnd("tap");
  // }

  console.time("tap");
  let routePosition = -1;
  for (let num of Array.from(Array(step).keys())) {
    if (num > routePosition) {
      routePosition = num;
      await loopFarmRoutePosition(routePosition);
    }
  }
  console.timeEnd("tap");

  // for (let num of Array.from(Array(step).keys())) {
  //   routePosition = num;
  //   console.log("routePosition", routePosition);
  //   await loopFarmRoutePosition(routePosition);
  //   if (num === 4) {
  //     break;
  //   }
  // }

  // await sleep(2);

  // for (let num of Array.from(Array(step).keys())) {
  //   routePosition = num;
  //   console.log("routePosition", routePosition);
  //   if (num > 4) {
  //     await loopFarmRoutePosition(routePosition);
  //   }
  //   if (num === 9) {
  //     break;
  //   }
  // }

  // await sleep(2);

  // for (let num of Array.from(Array(step).keys())) {
  //   routePosition = num;
  //   console.log("routePosition", routePosition);
  //   if (num > 9) {
  //     await loopFarmRoutePosition(routePosition);
  //   }
  // }
  // await run();
}

run();
