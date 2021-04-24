const WindowCapture = require("./src/Classes/WindowCapture");
const cv = require("opencv4nodejs");



// 0x1905fe PokeMMO
// 0x1905fe PokeMMO
// const wincap = new WindowCapture("Calculadora\0");
const wincap = new WindowCapture("PokeMMO\0");


// wincap.print();

async function run() {
  let time = new Date().getTime();


  // while (true) {


  // console.log("screenshot", screenshot);
  // const img = await wincap.print();
  // console.log("img width ", img);
  // detect('./horda.png');

  wincap.listall();
  console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
  time = new Date().getTime();
  // }


}

run();
