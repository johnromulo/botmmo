const cv = require("opencv4nodejs");

class Detection {
  stopped = true;
  screenshot = null;
  objects = [];
  points = [];

  constructor(imgs_objects) {
    this.objects = imgs_objects.map((img_object) => {
      const img = cv.imread(img_object.path, cv.TM_CCOEFF_NORMED);
      return {
        img,
        tagname: img_object.tagname,
        threshold: img_object.threshold,
        stopDetection: false,
      };
    });
  }

  start() {
    this.stopped = false;
  }

  stop() {
    this.stopped = true;
  }

  async run(screenshot) {
    this.screenshot = await cv.imdecodeAsync(screenshot, cv.IMREAD_UNCHANGED);
    if (!this.stopped && this.screenshot) {
      this.points = this.objects.map((obj) => {
        // if (!obj.stopDetection) {
        const matched = this.screenshot.matchTemplate(
          obj.img,
          cv.TM_CCOEFF_NORMED
        );

        const locations = matched
          .threshold(obj.threshold, 1, cv.THRESH_BINARY)
          .convertTo(cv.CV_8U)
          .findNonZero();

        return {
          locations: locations ? locations : [],
          tagname: obj.tagname,
          w: obj.img.cols,
          h: obj.img.rows,
        };
        // } else {
        //   return {
        //     locations: [],
        //     tagname: obj.tagname,
        //     w: obj.img.cols,
        //     h: obj.img.rows,
        //   };
        // }
      });
    }
  }
}

module.exports = Detection;
