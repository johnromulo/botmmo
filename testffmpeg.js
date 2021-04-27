const ffmpeg = require("ffmpeg-static");
const { spawn } = require("child_process");
const cv = require("opencv4nodejs");
const { createWriteStream, writeFile } = require("fs");
const { CV_16S } = require("opencv4nodejs");

// ffmpeg -f gdigrab -framerate 30 -i title = Calculadora output.mkv

const process = spawn(
  ffmpeg,
  // [
  //   "-f",
  //   "gdigrab",
  //   "-framerate",
  //   "60",
  //   "-i",
  //   'title="Calculadora"',
  // ],
  [
    "-probesize",
    "10M",
    "-f",
    "gdigrab",
    "-framerate",
    "60",
    "-i",
    "desktop",
    "image2",
    "-updatefirst",
    "1",
    "img.jpg",
  ],
  // ["-i", "file.mpg", "-r", "1/1", "$filename%03d.jpg"],
  // ["-probesize", "10M", "-f", "gdigrab", "-framerate", "60", "-i", "title=Calculadora", "-f", "flv", "-"],
  { stdio: "pipe" }
);

const stream = process.stdout;

// const file = createWriteStream("capture.jpg");
// stream.pipe(file);

stream.on("data", (chunk) => {
  console.log("chunk", chunk);
});

// async function run() {
//   const cap = new cv.VideoCapture("./capture.flv");

//   while (true) {
//     let time = new Date().getTime();

//     const frame = cap.read();

//     cv.imshow("Frame", frame);

//     console.log("FPS: ", (1000 / (new Date().getTime() - time)).toFixed(2));
//     time = new Date().getTime();

//     const key = cv.waitKey(1);
//     if (key === 113) {
//       finish = true;
//       detector.stop();
//       cv.destroyAllWindows();
//     }
//   }
// }
// run();
