const WindowCapture = require("../src/Classes/WindowCapture");
const cv = require("opencv4nodejs");

// 0x1905fe PokeMMO
// 0x1905fe PokeMMO
// const wincap = new WindowCapture("Calculadora\0");
// const wincap = new WindowCapture("PokeMMO\0");
// const wincap = new WindowCapture("?ok??MO\0");
const wincap = new WindowCapture("PokeMO\0");

// wincap.print();

async function run() {
  try {
    let time = new Date().getTime();
    const print = await wincap.print();
    // // console.log("print", print)

    // const base64Data = print.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

    // const buffer = Buffer.from(base64Data, 'base64');
    // console.log("buffer", buffer)

    const screenshot = cv.imdecode(print, cv.IMREAD_UNCHANGED);
    console.log("screenshot", screenshot)
    cv.imshow("Debug", screenshot);

    const key = cv.waitKey(1);
    if (key === 113) {
      finish = true;
      detector.stop();
      cv.destroyAllWindows();
    }

    // console.log("screenshot", screenshot);
    // const img = await wincap.print();
    // console.log("img width ", img);
    // detect('./horda.png');

    console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
    time = new Date().getTime();

    await run();

  } catch (error) {
    console.log("error", error);
  }
}

async function run2() {
  await wincap.print2();
}

run2();
