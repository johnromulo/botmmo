const customKeyTap = require("../../utils/customKeyTap");
const sleep = require("../../utils/sleep");
const configs = require("../../../config.json");
const { moveBike } = require("../../utils/steps");


async function goToFarm() {
  await customKeyTap(configs.keys.bike);
  await sleep(1);

  // await moveBike(configs.keys.left, 1);
  await moveBike(configs.keys.left, 6);

  // await moveBike(configs.keys.up, 1);
  await moveBike(configs.keys.up, 18);

  // await moveBike(configs.keys.left, 1);
  await moveBike(configs.keys.left, 19);

  // await moveBike(configs.keys.up, 1);
  await moveBike(configs.keys.up, 4);

  // await moveBike(configs.keys.left, 1);
  await moveBike(configs.keys.left, 6);

  // await moveBike(configs.keys.down, 1);
  await moveBike(configs.keys.down, 4);

  await sleep(1);
  await customKeyTap(configs.keys.bike);

}

module.exports = { goToFarm };
