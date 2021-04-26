const configs = require("../../../config.json");
const { moveStep } = require("../../utils/steps");


async function loopFarm() {
  await moveStep(configs.keys.left, 1);
  await moveStep(configs.keys.down, 3);
  await moveStep(configs.keys.left, 5);
  await moveStep(configs.keys.down, 2);
  await moveStep(configs.keys.right, 6);
  await moveStep(configs.keys.up, 4);
}

module.exports = { loopFarm };
