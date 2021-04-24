const WindowCapture = require("./src/Classes/WindowCapture");
const cv = require("opencv4nodejs");



const wincap = new WindowCapture("Calculadora\0");
// const wincap = new WindowCapture("PokeMMO\0");

// wincap.print();

async function run() {
  
  let time = new Date().getTime();
  console.log("run");
  while (true) {
    const print = await wincap.print();
    // console.log('print', print);
    const base64Data = print.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
    const screenshot = cv.imdecode(Buffer.from(base64Data, 'base64'), cv.IMREAD_UNCHANGED);
    // console.log("screenshot", screenshot);
    // const img = await wincap.print();
    // console.log("img width ", img);
    // detect('./horda.png');

    cv.imshow("Matches", screenshot);
    const key = cv.waitKey(1)
    if (key === 113){        
        detector.stop();
        cv.destroyAllWindows();
        break;
    } 
    console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
    time = new Date().getTime();
  }    
  
  
}

run();
