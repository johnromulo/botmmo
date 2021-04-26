const customKeyTap = require("../../utils/customKeyTap");
const configs = require("../../../config.json");
const { moveBike } = require("../../utils/steps");


async function goToFarm() {
  await customKeyTap(configs.keys.bike);
  await moveBike(configs.keys.left, 0.25);
  await moveBike(configs.keys.up, 1.45);
  await moveBike(configs.keys.left, 1.38);
  await moveBike(configs.keys.up, 0.15);
  await moveBike(configs.keys.left, 0.35);
  await moveBike(configs.keys.down, 0.214);
  await customKeyTap(configs.keys.bike);
  await customKeyTap(configs.keys.bike);
}

module.exports = { goToFarm };
