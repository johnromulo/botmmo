const { buildParentPort } = require('shinobi-worker');
const cv = require("opencv4nodejs");

const sleep = require("./sleep");
const WindowCapture = require("../Classes/WindowCapture");
const Detection = require("../Classes/Detection");
const Vision = require("../Classes/Vision");

const DEBUG = false;
let execRun = false;
let runCapture = false;

const parentPort = buildParentPort({
  json: true,
  debug: true,
  uncaughtException: true
})

parentPort.on('message', (data) => {
  if (typeof data.execRun === "boolean") {
    execRun = data.execRun;
  }
});

const postMessageToParent = (json) => {
  return parentPort.postMessage(json)
}

const postErrorToParent = function (text) {
  return parentPort.postError(text)
}

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

const wincap = new WindowCapture("PokeMMO\0");
// const wincap = new WindowCapture("Sem título - Bloco de Notas\0");
const detector = new Detection(detection_objects);
const vision = new Vision();


detector.start();

const run = async () => {

  try {
    if (execRun && !runCapture) {
      runCapture = true;
      const print = await wincap.print();

      const base64Data = print
        .replace("data:image/jpeg;base64,", "")
        .replace("data:image/png;base64,", "");

      await detector.run(Buffer.from(base64Data, "base64"));

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
        cv.imshow("Debug", detector.screenshot);
        const key = cv.waitKey(1);
        if (key === 113) {
          finish = true;
          detector.stop();
          cv.destroyAllWindows();
        }
      }
      runCapture = false;
      if (execRun) {
        postMessageToParent({ detector_points: detector.points });
      }
    }
    await sleep(1);
    run();
  } catch (error) {
    console.log(error);
    postErrorToParent({ error: JSON.stringify(error) })
  }
}
run();

// module.exports = { workerWindowCapture };
