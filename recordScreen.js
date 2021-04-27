const ffmpeg = require("ffmpeg-static");
const { spawn } = require("child_process");
const cv = require("opencv4nodejs");
const { createWriteStream } = require("fs");

// ffmpeg -f gdigrab -framerate 30 -i title = Calculadora output.mkv

// console.log("ffmpeg", ffmpeg);

const process = spawn(
  ffmpeg,
  ["-f", "gdigrab", "-framerate", "60", "-i", 'title="Calculadora"', "-f", "flv", "-"],
  // ["-probesize", "10M", "-f", "gdigrab", "-framerate", "60", "-i", "desktop", "-f", "flv", "-"],
  // ["-probesize", "10M", "-f", "gdigrab", "-framerate", "60", "-i", "title=Calculadora", "-f", "flv", "-"],
  { stdio: "pipe" }
);

const stream = process.stdout;

const file = createWriteStream("capture.flv");
stream.pipe(file);

// stream.on("data", chunk => {
//   console.log("chunk", chunk);

//   const screenshot = cv.imencode(chunk,
//     cv.IMREAD_UNCHANGED
//   );

//   cv.imshow("Matches", screenshot);
//   cv.waitKey();
// });