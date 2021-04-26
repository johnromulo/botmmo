const sleep = require("./src/utils/sleep");
// const configs = require("./config.json");
const { loopFarm } = require('./src/farms/money/loopFarm');


async function run() {
  console.log("waiting");
  await sleep(3);
  await loopFarm();

}

run();