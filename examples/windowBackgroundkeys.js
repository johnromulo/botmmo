const WindowCapture = require("../src/Classes/WindowCapture");

// 0x1905fe PokeMMO
// 0x1905fe PokeMMO
// const wincap = new WindowCapture("Calculadora\0");
// const wincap = new WindowCapture("PokeMMO\0");
// const wincap = new WindowCapture("?ok??MO\0");
const wincap = new WindowCapture("PokeMMO");

// wincap.print();

async function run() {
  try {
    let time = new Date().getTime();

    const print = await wincap.print();

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

run();
