const customKeyTap = require("../utils/customKeyTap");
const sleep = require("../utils/sleep");
const repeat = require("../utils/repeat");
const configs = require("../../config.json");

/*
  ATKS NUMBER
  1    |   2
  3    |   4
*/

async function atk(atk_number) {
  await repeat(2, 0.5, async () => await customKeyTap(configs.keys.left));
  await repeat(2, 0.5, async () => await customKeyTap(configs.keys.up));
  if ((atk_number === 1)) {
    await repeat(2, 0.5, async () => await customKeyTap(configs.keys.button_z));
  } else if ((atk_number === 2)) {
    await customKeyTap(configs.keys.button_z);
    await customKeyTap(configs.keys.right);
    await customKeyTap(configs.keys.button_z);
  } else if ((atk_number === 3)) {
    await customKeyTap(configs.keys.button_z);
    await customKeyTap(configs.keys.down);
    await customKeyTap(configs.keys.button_z);
  } else if ((atk_number === 4)) {
    await customKeyTap(configs.keys.button_z);
    await customKeyTap(configs.keys.down);
    await customKeyTap(configs.keys.right);
    await customKeyTap(configs.keys.button_z);
  }
  await sleep(9);
}

module.exports = { atk };
