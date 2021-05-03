const { Worker } = require('shinobi-worker');

const { goToCenter } = require("../../game/goToCenter");
const { healCenter } = require("../../game/healCenter");
const { atk } = require("../../game/atk");
const { escape } = require("../../game/escape");
const { skipEvolution } = require("../../game/skipEvolution");
const { skipNewAtk } = require("../../game/skipNewAtk");
const { goToFarm } = require("./goToFarm");
const { exitCenter } = require("./exitCenter");
const { loopFarmRoutePosition } = require("./loopFarm");
const { resetRoute } = require("./resetRoute");
const configs = require("../../../config.json");

const sleep = require("../../utils/sleep");
const { restTime } = require("../../utils/restTime");

let finish = false;

// let time = new Date().getTime();
const BOT_STAGES = {
  START: 0,
  CENTER: 1,
  GO_TO_FARM: 2,
  FARMING: 3,
  BATTLE: 4,
  BATTLE_OUT: 5,
  REST_TIME: 6
};

let bot_stage = BOT_STAGES.START;
let atk_qt = 0;
let pp = configs.amount_uses.pp;
let runbot = false;
let routePosition = -1;
let escape_battle = false;

let detector_points = [];
let workerProcess = null;
const createNewProcess = async () => {
  const pathToWorkerScript = __dirname + '../../../utils/workerWindowCapture.js'
  workerProcess = Worker(
    pathToWorkerScript,
    {
      json: true,
      debug: true,
    }
  )

  workerProcess.on('message', function (data) {
    console.log("data", data);
    if (data.detector_points) {
      detector_points = data.detector_points;
    }
  })

  workerProcess.on('close', function () {
    console.log("close");
  })

  workerProcess.on('error', function (data) {
    console.log("error", data);
  })

  workerProcess.on('failedParse', function (stringThatFailedToParse) {
    console.log("failedParse", stringThatFailedToParse);
  })

  return workerProcess
}

async function bot() {
  if (!runbot) {
    console.log("bot run");
    runbot = true;
    switch (bot_stage) {
      case BOT_STAGES.START:
        console.log("BOT_STAGES.START");
        await goToCenter();
        bot_stage = BOT_STAGES.CENTER;
        break;
      case BOT_STAGES.CENTER:
        console.log("BOT_STAGES.CENTER");
        await healCenter();
        await exitCenter();
        bot_stage = BOT_STAGES.GO_TO_FARM;
        break;
      case BOT_STAGES.GO_TO_FARM:
        console.log("BOT_STAGES.GO_TO_FARM");
        await goToFarm();
        bot_stage = BOT_STAGES.FARMING;
        workerProcess.postMessage({ execRun: true });
        await sleep(4);
        break;
      case BOT_STAGES.FARMING:
        console.log("BOT_STAGES.FARMING");
        for (let num of Array.from(Array(22).keys())) {
          if (num > routePosition) {
            console.log("step", num);
            console.time("stp");
            routePosition = num;
            await loopFarmRoutePosition(routePosition);
            console.timeEnd("stp");
            console.log("end step", num);
          }
          if (
            detector_points &&
            detector_points.length > 0 &&
            detector_points.find((point) => point.tagname === "hp").locations
              .length > 0
          ) {
            workerProcess.postMessage({ execRun: false });
            bot_stage = BOT_STAGES.BATTLE;
            break;
          }
        }
        routePosition = -1;
        console.log("end loop");
        break;
      case BOT_STAGES.BATTLE:
        console.log("BOT_STAGES.BATTLE");
        if (
          detector_points &&
          detector_points.find((point) => point.tagname === "horda").locations
            .length > 0
        ) {
          await escape();
          escape_battle = true;
          bot_stage = BOT_STAGES.BATTLE_OUT;
        } else {
          if (atk_qt === 0) {
            escape_battle = false;
            console.log("atk_1");
            await atk(1);
          } else {
            if (
              detector_points &&
              detector_points.find(
                (point) => point.tagname === "hp"
              ).locations.length > 0
            ) {
              console.log("atk_2");
              await atk(2);
            }
          }
        }

        workerProcess.postMessage({ execRun: true });
        await sleep(6);
        workerProcess.postMessage({ execRun: false });

        if (
          detector_points && (
            detector_points.find((point) => point.tagname === "new_atk").locations
              .length > 0 ||
            detector_points.find((point) => point.tagname === "cancel_btn_new_atk").locations
              .length > 0
          )
        ) {
          await skipNewAtk();
        }

        if (configs.skip_evoluttion) {
          if (
            detector_points && (
              detector_points.find((point) => point.tagname === "cancel_btn_evolution").locations
                .length > 0 ||
              detector_points.find((point) => point.tagname === "evolution").locations
                .length > 0
            )
          ) {
            await skipEvolution();
          }
        }

        if (
          detector_points &&
          detector_points.find((point) => point.tagname === "run").locations
            .length > 0
        ) {
          bot_stage = BOT_STAGES.BATTLE_OUT;
        } else {
          atk_qt++;
        }
        break;
      case BOT_STAGES.BATTLE_OUT:
        console.log("BOT_STAGES.BATTLE_OUT");
        if (!escape_battle) {
          pp--;
        }
        atk_qt = 0;
        console.log(`restam ${pp}s`);
        bot_stage = BOT_STAGES.REST_TIME;
      case BOT_STAGES.REST_TIME:
        console.log("BOT_STAGES.REST_TIME");
        await restTime();
        if (pp === 0) {
          bot_stage = BOT_STAGES.START;
        } else {
          workerProcess.postMessage({ execRun: true });
          await resetRoute();
          routePosition = 18;
          bot_stage = BOT_STAGES.FARMING;
        }
      default:
        break;
    }
    console.log("bot run out");
    runbot = false;
  }
}

async function run() {
  bot();
  await sleep(1);
  if (!finish) {
    run();
  } else {
    workerProcess.kill();
  }
}

async function init() {
  createNewProcess();
  console.log("init");
  await sleep(15);
  console.log("run");
  run();
}

init();
