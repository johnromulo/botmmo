const configs = require("../../../config.json");
const { moveStep } = require("../../utils/steps");
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
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 1) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 2) {
    await moveStep(configs.keys.down, 1);
  } else if (routePosition === 3) {
    await moveStep(configs.keys.down, 1);
  } else if (routePosition === 4) {
    await moveStep(configs.keys.down, 1);
  } else if (routePosition === 5) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 6) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 7) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 8) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 9) {
    await moveStep(configs.keys.left, 1);
  } else if (routePosition === 10) {
    await moveStep(configs.keys.down, 1);
  } else if (routePosition === 11) {
    await moveStep(configs.keys.down, 1);
  } else if (routePosition === 12) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 13) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 14) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 15) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 16) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 17) {
    await moveStep(configs.keys.right, 1);
  } else if (routePosition === 18) {
    await moveStep(configs.keys.up, 1);
  } else if (routePosition === 19) {
    await moveStep(configs.keys.up, 1);
  } else if (routePosition === 20) {
    await moveStep(configs.keys.up, 1);
  } else if (routePosition === 21) {
    await moveStep(configs.keys.up, 1);
  }
}

module.exports = { loopFarm, loopFarmRoutePosition };
