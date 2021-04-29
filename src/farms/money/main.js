const cv = require("opencv4nodejs");

const Detection = require("../../Classes/Detection");
const Vision = require("../../Classes/Vision");
const WindowCapture = require("../../Classes/WindowCapture");

const { goToCenter } = require("../../game/goToCenter");
const { healCenter } = require("../../game/healCenter");
const { atk } = require("../../game/atk");
const { escape } = require("../../game/escape");
const { goToFarm } = require("./goToFarm");
const { exitCenter } = require("./exitCenter");
const { loopFarmRoutePosition } = require("./loopFarm");
const configs = require("../../../config.json");

const sleep = require("../../utils/sleep");

const detection_objects = [
  {
    path: "./images/battledetect/horder.jpg",
    tagname: "horda",
    threshold: 0.98,
  },
  {
    path: "./images/battledetect/my_hp.jpg",
    tagname: "hp",
    threshold: 0.94,
  },
  {
    path: "./images/battledetect/enemy_hp.jpg",
    tagname: "enemy_hp",
    threshold: 0.98,
  },
  {
    path: "./images/battledetect/evolution.jpg",
    tagname: "evolution",
    threshold: 0.995,
  },
  {
    path: "./images/battledetect/cancel_btn_evolution.jpg",
    tagname: "cancel_btn_evolution",
    threshold: 0.98,
  },
  {
    path: "./images/battledetect/new_atk.jpg",
    tagname: "new_atk",
    threshold: 0.98,
  },
  {
    path: "./images/battledetect/cancel_btn_new_atk.jpg",
    tagname: "cancel_btn_new_atk",
    threshold: 0.98,
  },
  {
    path: "./images/battledetect/run.jpg",
    tagname: "run",
    threshold: 0.85,
  },
  {
    path: "./images/battledetect/enemy_hp_finish.jpg",
    tagname: "enemy_hp_finish",
    threshold: 0.98,
  },
];

// OpenJDK Platform binary;
const wincap = new WindowCapture("PokeMMO\0");
// const wincap = new WindowCapture("OpenJDK Platform binary\0");
const vision = new Vision();
const detector = new Detection(detection_objects);

const DEBUG = true;
let finish = false;

// let time = new Date().getTime();
detector.start();

const BOT_STAGES = {
  START: 0,
  CENTER: 1,
  GO_TO_FARM: 2,
  FARMING: 3,
  BATTLE: 4,
  BATTLE_OUT: 5,
};

let bot_stage = BOT_STAGES.START;
let atk_qt = 0;
let pp = configs.amount_uses.pp;
let runbot = false;
let routePosition = -1;
let escape_battle = false;
// const time = new Date().getTime();

let execCapture = false;
async function capture() {
  if (execCapture) {
    console.log("capture");
    const print = await wincap.print();

    const base64Data = print
      .replace("data:image/jpeg;base64,", "")
      .replace("data:image/png;base64,", "");

    detector.run(Buffer.from(base64Data, "base64"));
    // detector.run(print);

    if (DEBUG && detector.points) {
      const pointsRun = detector.points.find(
        (point) => point.tagname === "run"
      );
      if (pointsRun && pointsRun.locations.length > 0) {
        pointsRun.locations.forEach((point) => {
          vision.draw_rectangles(
            detector.screenshot,
            {
              x: point.x,
              y: point.y,
              w: pointsRun.w,
              h: pointsRun.h,
            },
            { B: 255, G: 0, R: 0 }
          );
        });
      }

      const pointsHorde = detector.points.find(
        (point) => point.tagname === "horda"
      );

      if (pointsHorde && pointsHorde.locations.length > 0) {
        pointsHorde.locations.forEach((point) => {
          vision.draw_rectangles(
            detector.screenshot,
            {
              x: point.x,
              y: point.y,
              w: pointsHorde.w,
              h: pointsHorde.h,
            },
            { B: 0, G: 0, R: 255 }
          );
        });
      }

      const pointsMyHp = detector.points.find(
        (point) => point.tagname === "hp"
      );
      if (pointsMyHp && pointsMyHp.locations.length > 0) {
        pointsMyHp.locations.forEach((point) => {
          vision.draw_rectangles(
            detector.screenshot,
            {
              x: point.x,
              y: point.y,
              w: pointsMyHp.w,
              h: pointsMyHp.h,
            },
            { B: 0, G: 255, R: 0 }
          );
        });
      }
    }

    if (DEBUG && detector.screenshot) {
      console.log("show");
      cv.imshow("Debug", detector.screenshot);
      const key = cv.waitKey(1);
      if (key === 113) {
        finish = true;
        detector.stop();
        cv.destroyAllWindows();
      }
    }
  }
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
        execCapture = true;
        await sleep(4);
        break;
      case BOT_STAGES.FARMING:
        console.log("BOT_STAGES.FARMING");
        for (let num of Array.from(Array(22).keys())) {
          if (
            detector.points &&
            detector.points.find((point) => point.tagname === "hp").locations
              .length > 0
          ) {
            console.log("routePosition", routePosition);
            execCapture = false;
            bot_stage = BOT_STAGES.BATTLE;
            break;
          } else {
            if (num > routePosition) {
              console.log("step", num);
              routePosition = num;
              await loopFarmRoutePosition(routePosition);
              console.log("end step", num);
            }
          }
        }
        routePosition = -1;
        console.log("end loop");

        // if (
        //   detector.points &&
        //   detector.points.find((point) => point.tagname === "hp").locations
        //     .length > 0
        // ) {
        //   // console.log("routePosition", routePosition);
        //   execCapture = false;
        //   bot_stage = BOT_STAGES.BATTLE;
        //   break;
        // }
        break;
      case BOT_STAGES.BATTLE:
        console.log("BOT_STAGES.BATTLE");
        if (
          detector.points &&
          detector.points.find((point) => point.tagname === "horda").locations
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
              detector.points &&
              !detector.points.find(
                (point) => point.tagname === "enemy_hp_finish"
              ).locations.length > 0
            ) {
              console.log("atk_2");
              await atk(2);
            }
          }
        }
        execCapture = true;
        await sleep(6);
        execCapture = false;
        if (
          detector.points &&
          detector.points.find((point) => point.tagname === "run").locations
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
        if (pp === 0) {
          bot_stage = BOT_STAGES.START;
        } else {
          execCapture = true;
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
  capture();
  bot();

  await sleep(1);
  if (!finish) {
    run();
  }
}

// detector.objects.find((obj) => obj.tagname === "hp").stopDetection = false;
// detector.objects.find(
//   (obj) => obj.tagname === "enemy_hp_finish"
// ).stopDetection = false;
// detector.objects.find((obj) => obj.tagname === "run").stopDetection = false;

async function init() {
  console.log("init");
  await sleep(15);
  console.log("run");
  await run();
}

init();
