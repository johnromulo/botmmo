// const sharp = require("sharp");
// const screenshot = require("screenshot-desktop");
const WindowCapture = require("./src/Classes/WindowCapture");
const cv = require("opencv4nodejs");

// screenshot()
//   .then((img) => {
//     sharp(img)
//       .extract({ left: 200, top: 70, width: 1720, height: 250 })
//       .toBuffer()
//       .then((data) => decode(data))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const wincap = new WindowCapture("PokeMMO\0");

async function run() {
  try {
    let time = new Date().getTime();

    const print = await wincap.print();
    console.log("screenshot", print);

    const screenshot = cv.imdecode(print, cv.IMREAD_UNCHANGED);
    console.log("screenshot", screenshot);
    cv.imshow("Debug", screenshot);

    const key = cv.waitKey(1);
    if (key === 113) {
      finish = true;
      detector.stop();
      cv.destroyAllWindows();
    }

    console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
    time = new Date().getTime();

    await run();
  } catch (error) {
    console.log("error", error);
  }
}

run();
