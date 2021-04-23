const { K, U } = require("win32-api");
const robot = require("robotjs");
let Jimp = require("jimp");

require("ref-napi");

K.load();
const user32 = U.load();

function colorNormalize(robotScreenPic, path) {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
      let pos = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
      });
      // image.write(path, resolve);
      // const bs64 = Buffer.from(image.bitmap.data).toString("base64");
      image.getBase64(Jimp.MIME_PNG, (err, res) => {
        resolve(res);
      });
      
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

class WindowCapture {
  stopped = true;
  screenshot = null;

  hwnd = null;
  w = 0;
  h = 0;
  cropped_x = 0;
  cropped_y = 0;
  offset_x = 0;
  offset_y = 0;

  constructor(title) {
    console.log("search ", title);
    const lpszWindow = Buffer.from(title, "ucs2");
    this.hwnd = user32.FindWindowExW(0, 0, null, lpszWindow);

    if (
      (typeof this.hwnd === "number" && this.hwnd > 0) ||
      (typeof this.hwnd === "bigint" && this.hwnd > 0) ||
      (typeof this.hwnd === "string" && this.hwnd.length > 0)
    ) {
      const rectPointer = Buffer.alloc(16);
      const getWindowRect = user32.GetWindowRect(this.hwnd, rectPointer);

      if (getWindowRect) {
        const rect = {};
        rect.left = rectPointer.readInt16LE(0);
        rect.top = rectPointer.readInt16LE(4);
        rect.right = rectPointer.readInt16LE(8);
        rect.bottom = rectPointer.readInt16LE(12);

        this.w = rect.right - rect.left;
        this.h = rect.bottom - rect.top;

        const border_pixels = 8;
        const titlebar_pixels = 30;
        this.w = this.w - border_pixels * 2;
        this.h = this.h - titlebar_pixels - border_pixels;
        this.cropped_x = border_pixels;
        this.cropped_y = titlebar_pixels;

        this.offset_x = rect.left + this.cropped_x;
        this.offset_y = rect.top + this.cropped_y;

        // console.log(
        //   "window finded",
        //   rect,
        //   "w",
        //   this.w,
        //   "h",
        //   this.h,
        //   "cropped_x",
        //   this.cropped_x,
        //   "cropped_y",
        //   this.cropped_y,
        //   "offset_x",
        //   this.offset_x,
        //   "offset_y",
        //   this.offset_y
        // );
      }
    } else {
      throw new Error(`Window not found: ${title}`);
    }
  }

  async print() {
    const pic = robot.screen.capture(
      this.offset_x,
      this.offset_y,
      this.w,
      this.h
    );

    const screenshot = await colorNormalize(pic, "t.jpg");
    return screenshot;
  }

  async run() {
    while (!this.stopped) {
      this.screenshot = await wincap.print();
    }
  }
}

module.exports = WindowCapture;
