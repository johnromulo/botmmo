const configs = require("../../config.json");
const sleep = require("./sleep");
// const time = new Date().getTime();
let timePause = time + 1000 * 60 * configs.pause_time;

async function controlRun(time, funcContinue) {
  const timeRun = new Date();
  var diff = Math.abs(timeRun - time);
  var minutes = Math.floor(diff / 1000 / 60);

  console.log("tempo rodando: ", minutes, "minutos");
  if (time + 1000 * 60 * configs.run_minutes <= timeRun.getTime()) {
    console.log("fim");
    0;
    process.exit();
  } else if (timePause <= timeRun.getTime()) {
    timePause = timeRun.getTime() + 1000 * 60 * configs.pause_time;
    await sleep(60 * 2);
    // await goToCenter();
    await funcContinue();
  }
}

module.exports = { controlRun };
