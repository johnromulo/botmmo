const cv = require("opencv4nodejs");

async function run() {
  const screenshot = await cv.imreadAsync(
    "./images/hd/evolution_2.jpg",
    cv.IMREAD_UNCHANGED
  );

  const threshold = 0.98;
  const needle = await cv.imreadAsync(
    "./images/battledetect/cancel_btn_evolution.jpg",
    cv.IMREAD_UNCHANGED
  );

  const matched = screenshot.matchTemplate(needle, cv.TM_CCOEFF_NORMED);

  const locations = matched
    .threshold(threshold, 1, cv.THRESH_BINARY)
    .convertTo(cv.CV_8U)
    .findNonZero();

  console.log("locations", locations);

  const { minVal, maxVal, minLoc, maxLoc } = matched.minMaxLoc();

  if (maxVal >= threshold) {
    console.log("Found needle!");

    // console.log("maxVal", maxVal);
    // console.log("minVal", minVal);
    // console.log("minLoc", minLoc);
    // console.log("maxLoc", maxLoc);

    locations.forEach((pt) => {
      screenshot.drawRectangle(
        new cv.Rect(pt.x, pt.y, needle.cols, needle.rows),
        new cv.Vec3(255, 0, 0),
        1,
        cv.LINE_8
      );
    });

    const needle2 = await cv.imreadAsync(
      "./images/battledetect/evolution.jpg",
      cv.IMREAD_UNCHANGED
    );

    const matched2 = screenshot.matchTemplate(needle2, cv.TM_CCOEFF_NORMED);

    const locations2 = matched2
      .threshold(0.94, 1, cv.THRESH_BINARY)
      .convertTo(cv.CV_8U)
      .findNonZero();

    console.log("locations2", locations2);

    const { minVal, maxVal, minLoc, maxLoc } = matched2.minMaxLoc();

    if (maxVal >= threshold) {
      console.log("Found needle2!");

      // console.log("maxVal", maxVal);
      // console.log("minVal", minVal);
      // console.log("minLoc", minLoc);
      // console.log("maxLoc", maxLoc);

      locations2.forEach((pt) => {
        screenshot.drawRectangle(
          new cv.Rect(pt.x, pt.y, needle2.cols, needle2.rows),
          new cv.Vec3(0, 255, 0),
          1,
          cv.LINE_8
        );
      });
    }

    cv.imshow("Matches", screenshot);
    cv.waitKey();
  } else {
    console.log("Needle not found!");
  }
}

run();
