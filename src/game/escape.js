const customKeyTap = require("../utils/customKeyTap");
const sleep = require("../utils/sleep");
const repeat = require("../utils/repeat");
const configs = require("../../config.json");

async function escape() {
  await repeat(2, 0.5, async () => await customKeyTap(configs.keys.left));
  await repeat(2, 0.5, async () => await customKeyTap(configs.keys.up));
  await customKeyTap(configs.keys.down);
  await customKeyTap(configs.keys.right);
  await customKeyTap(configs.keys.button_z);
  await sleep(4);
}

module.exports = { escape };
