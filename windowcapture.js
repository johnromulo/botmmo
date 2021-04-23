const WindowCapture = require("./src/Classes/WindowCapture");


const wincap = new WindowCapture("Calculadora\0");
// const wincap = new WindowCapture("PokeMMO\0");

// wincap.print();

async function run() {
  let time = new Date().getTime();
  while (true) {
    await wincap.print();
    // const img = await wincap.print();
    // console.log("img width ", img);
    // detect('./horda.png');
    console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
    time = new Date().getTime();
  }
}

run();
