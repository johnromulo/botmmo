const cv = require("opencv4nodejs");

async function run() {
  // horder
  //battle
  const screenshot = await cv.imreadAsync(
    "./images/horder.jpg",
    cv.IMREAD_UNCHANGED
  );

  //enemy_hp
  //horder
  const needle = await cv.imreadAsync(
    "./images/battledetect/horder.jpg",
    cv.IMREAD_UNCHANGED
  );

  const matched = screenshot.matchTemplate(needle, cv.TM_CCOEFF_NORMED);

  const locations = matched
    .threshold(0.98, 1, cv.THRESH_BINARY)
    .convertTo(cv.CV_8U)
    .findNonZero();

  console.log("locations", locations);

  const { minVal, maxVal, minLoc, maxLoc } = matched.minMaxLoc();

  const threshold = 0.8;
  if (maxVal >= threshold) {
    console.log("Found needle!");

    // console.log("maxVal", maxVal);
    // console.log("minVal", minVal);
    // console.log("minLoc", minLoc);
    // console.log("maxLoc", maxLoc);

    locations.forEach((pt) => {
      screenshot.drawRectangle(
        new cv.Rect(pt.x, pt.y, needle.cols, needle.rows),
        new cv.Vec3(0, 255, 0),
        1,
        cv.LINE_8
      );
    });

    cv.imshow("Matches", screenshot);
    cv.waitKey();
  } else {
    console.log("Needle not found!");
  }
}

run();
