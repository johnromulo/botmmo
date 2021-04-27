const cv = require("opencv4nodejs");

class Vision {
  draw_rectangles(haystack_img, point, color) {

    // points = [{location: [], tagname: 'tg1', w: 200, h :30}];

    // color (0, 255, 0)
    haystack_img.drawRectangle(
      new cv.Rect(point.x, point.y, point.w, point.h),
      new cv.Vec3(color.B, color.G, color.R),
      1,
      cv.LINE_8
    );
  }
}

module.exports = Vision;