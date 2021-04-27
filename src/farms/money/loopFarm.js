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

module.exports = { loopFarm };
