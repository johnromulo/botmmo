const customKeyTap = require("../utils/customKeyTap");
const sleep = require("../utils/sleep");
const configs = require("../../config.json");

async function skipEvolution() {
  await customKeyTap(configs.keys.button_b);
  await sleep(1);
  await customKeyTap(configs.keys.button_z);
  await sleep(9);
}

module.exports = { skipEvolution };
