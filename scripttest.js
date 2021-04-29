const robot = require("robotjs");
const sleep = require("./src/utils/sleep");
const { moveStep, moveBike } = require("./src/utils/steps");
const { goToFarm } = require("./src/farms/money/goToFarm");
const { exitCenter } = require("./src/farms/money/exitCenter");
const { loopFarmRoutePosition, loopFarm } = require("./src/farms/money/loopFarm");
const { goToCenter } = require("./src/game/goToCenter");
const configs = require("./config.json");

async function run() {
  await sleep(4);
  console.log("run");


  const step = 6;
  console.time("tap");
  robot.setKeyboardDelay(1);
  const sec = 1 * 1000;
  robot.keyToggle(configs.keys.left, "down");
  await sleep(sec);
  robot.keyToggle(configs.keys.left, "up");
  console.timeEnd("tap");

  // console.time("tap");
  // let routePosition = -1;
  // for (let num of Array.from(Array(22).keys())) {
  //   if (num > routePosition) {
  //     routePosition = num;
  //     console.log("routePosition", routePosition);
  //     await loopFarmRoutePosition(routePosition);
  //   }
  // }
  // console.timeEnd("tap");

  // for (let num of Array.from(Array(16).keys())) {
  //   routePosition = num;
  //   console.log("routePosition", routePosition);
  //   await loopFarmRoutePosition(routePosition);
  //   if (num === 4) {
  //     break;
  //   }
  // }

  // await sleep(2);

  // for (let num of Array.from(Array(16).keys())) {
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

  // for (let num of Array.from(Array(16).keys())) {
  //   routePosition = num;
  //   console.log("routePosition", routePosition);
  //   if (num > 9) {
  //     await loopFarmRoutePosition(routePosition);
  //   }
  // }
  // await run();
}

run();
