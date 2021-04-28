const configs = require("../../../config.json");
const { moveStep } = require("../../utils/steps");


async function loopFarm() {
  await moveStep(configs.keys.left, 1);
  await moveStep(configs.keys.down, 2);
  await moveStep(configs.keys.left, 4);
  await moveStep(configs.keys.down, 1);
  await moveStep(configs.keys.right, 5);
  await moveStep(configs.keys.up, 3);
}

async function loopFarmRoutePosition(routePositon) {
  if (routePositon === 0) {
    await moveStep(configs.keys.left, 1);
  } else if (routePositon === 1) {
    await moveStep(configs.keys.down, 1);
  } else if (routePositon === 2) {
    await moveStep(configs.keys.down, 1);
  } else if (routePositon === 3) {
    await moveStep(configs.keys.left, 1);

  } else if (routePositon === 4) {
    await moveStep(configs.keys.left, 1);

  } else if (routePositon === 5) {
    await moveStep(configs.keys.left, 1);

  } else if (routePositon === 6) {
    await moveStep(configs.keys.left, 1);

  } else if (routePositon === 7) {
    await moveStep(configs.keys.down, 1);

  } else if (routePositon === 8) {
    await moveStep(configs.keys.right, 1);

  } else if (routePositon === 9) {
    await moveStep(configs.keys.right, 1);

  } else if (routePositon === 10) {
    await moveStep(configs.keys.right, 1);

  } else if (routePositon === 11) {
    await moveStep(configs.keys.right, 1);

  } else if (routePositon === 12) {
    await moveStep(configs.keys.right, 1);

  } else if (routePositon === 13) {
    await moveStep(configs.keys.up, 1);

  } else if (routePositon === 14) {
    await moveStep(configs.keys.up, 1);
  } else if (routePositon === 15) {
    await moveStep(configs.keys.up, 1);
  }


}

module.exports = { loopFarm, loopFarmRoutePosition };
