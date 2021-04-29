const configs = require("../../../config.json");
const { moveStep, moveBike } = require("../../utils/steps");
const sleep = require("../../utils/sleep");

async function loopFarm() {
  await moveStep(configs.keys.left, 2);
  await moveStep(configs.keys.down, 3);
  await moveStep(configs.keys.left, 5);
  await moveStep(configs.keys.down, 2);
  await moveStep(configs.keys.right, 6);
  await moveStep(configs.keys.up, 4);
}

async function loopFarmRoutePosition(routePositon) {
  if (routePositon === 0) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 1) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 2) {
    await moveBike(configs.keys.down, 1);
  } else if (routePositon === 3) {
    await moveBike(configs.keys.down, 1);
  } else if (routePositon === 4) {
    await moveBike(configs.keys.down, 1);
  } else if (routePositon === 5) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 6) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 7) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 8) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 9) {
    await moveBike(configs.keys.left, 1);
  } else if (routePositon === 10) {
    await moveBike(configs.keys.down, 1);
  } else if (routePositon === 11) {
    await moveBike(configs.keys.down, 1);
  } else if (routePositon === 12) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 13) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 14) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 15) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 16) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 17) {
    await moveBike(configs.keys.right, 1);
  } else if (routePositon === 18) {
    await moveBike(configs.keys.up, 1);
  } else if (routePositon === 19) {
    await moveBike(configs.keys.up, 1);
  } else if (routePositon === 20) {
    await moveBike(configs.keys.up, 1);
  } else if (routePositon === 21) {
    await moveBike(configs.keys.up, 1);
  }
}

module.exports = { loopFarm, loopFarmRoutePosition };
