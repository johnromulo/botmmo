const customKeyTap = require("../utils/customKeyTap");
const sleep = require("../utils/sleep");
const configs = require("../../config.json");

async function goToCenter() {
  await customKeyTap(configs.keys.teleport);
  await sleep(5);
}

module.exports = { goToCenter };
