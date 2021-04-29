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

async function loopFarmRoutePosition(routePosition) {
  console.log("routePosition", routePosition);
  if (routePosition === 0) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 1) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 2) {
    await moveBike(configs.keys.down, 1);
  } else if (routePosition === 3) {
    await moveBike(configs.keys.down, 1);
  } else if (routePosition === 4) {
    await moveBike(configs.keys.down, 1);
  } else if (routePosition === 5) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 6) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 7) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 8) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 9) {
    await moveBike(configs.keys.left, 1);
  } else if (routePosition === 10) {
    await moveBike(configs.keys.down, 1);
  } else if (routePosition === 11) {
    await moveBike(configs.keys.down, 1);
  } else if (routePosition === 12) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 13) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 14) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 15) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 16) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 17) {
    await moveBike(configs.keys.right, 1);
  } else if (routePosition === 18) {
    await moveBike(configs.keys.up, 1);
  } else if (routePosition === 19) {
    await moveBike(configs.keys.up, 1);
  } else if (routePosition === 20) {
    await moveBike(configs.keys.up, 1);
  } else if (routePosition === 21) {
    await moveBike(configs.keys.up, 1);
  }
}

module.exports = { loopFarm, loopFarmRoutePosition };
