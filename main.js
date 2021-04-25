const cv = require("opencv4nodejs");

const Detection = require("./src/Classes/Detection");
const Vision = require("./src/Classes/Vision");
const WindowCapture = require("./src/Classes/WindowCapture");


const detection_objects = [
  {
    path: "./images/battledetect/horder.jpg",
    tagname: "horda",
    threshold: 0.98
  },
  {
    path: "./images/battledetect/enemy_hp.jpg",
    tagname: "enemy_hp",
    threshold: 0.98
  },
  {
    path: "./images/battledetect/my_hp.jpg",
    tagname: "hp",
    threshold: 0.98
  },
  {
    path: "./images/battledetect/evolution.jpg",
    tagname: "evolution",
    threshold: 0.995
  },
  {
    path: "./images/battledetect/cancel_btn_evolution.jpg",
    tagname: "cancel_btn_evolution",
    threshold: 0.98
  },
  {
    path: "./images/battledetect/new_atk.jpg",
    tagname: "new_atk",
    threshold: 0.98
  },
  {
    path: "./images/battledetect/cancel_btn_new_atk.jpg",
    tagname: "cancel_btn_new_atk",
    threshold: 0.98
  }
]

// OpenJDK Platform binary;
const wincap = new WindowCapture("PokeMMO\0");
// const wincap = new WindowCapture("OpenJDK Platform binary\0");
const vision = new Vision();
const detector = new Detection(detection_objects);

const DEBUG = true;
const finish = false;

let time = new Date().getTime();
detector.start();

async function run() {
  const print = await wincap.print();

  const base64Data = print.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

  detector.run(Buffer.from(base64Data, 'base64'));

  if (detector.points) {
    const pointsHorder = detector.points.find(point => point.tagname === 'horda');
    // console.log("pointsHorder", pointsHorder);

    if (pointsHorder && pointsHorder.locations.leght) {
      pointsHorder.locations.forEach(point => {
        vision.draw_rectangles(detector.screenshot, {
          x: point.x, y: point.y, w: pointsHorder.w, h: pointsHorder.h
        }, { B: 0, G: 255, B: 0 });
      });
    }
  }

  if (DEBUG) {
    cv.imshow("Debug", detector.screenshot);
    const key = cv.waitKey(1);
    if (key === 113) {
      finish = true;
      detector.stop();
      cv.destroyAllWindows();
    }
  }

  console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
  time = new Date().getTime();
  if (!finish) {
    await run();
  }
}

run();

