const { moveStep } = require("../../utils/steps");
const configs = require("../../../config.json");
const sleep = require("../../utils/sleep");

async function exitCenter() {
  await moveStep(configs.keys.down, 6);
  await sleep(2);
}

module.exports = { exitCenter };
