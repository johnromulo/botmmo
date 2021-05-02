const configs = require("../../../config.json");
const { moveStep } = require("../../utils/steps");


async function resetRoute() {
  await moveStep(configs.keys.down, 6);
  await moveStep(configs.keys.right, 6);
}

module.exports = { resetRoute };
