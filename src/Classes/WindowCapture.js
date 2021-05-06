const { K, U } = require("win32-api");
var ref = require("ref-napi");
var ffi = require("ffi-napi");
const robot = require("robotjs");
let Jimp = require("jimp");

require("ref-napi");

K.load();
const user32 = U.load();

function colorNormalize(robotScreenPic) {
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
      // console.log("image.bitmap.data", image.bitmap.data);
      image.getBase64(Jimp.MIME_JPEG, (err, res) => {
        resolve(res);
      });

      // image.getBuffer(Jimp.MIME_X_MS_BMP, (err, res) => {
      //   // console.log(buffer);
      //   resolve(res);
      // });
      // resolve(image.bitmap.data);
      // image.write('screenshot.jpg', resolve);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function changeNameWindow() {
  var voidPtr = ref.refType(ref.types.void);
  var stringPtr = ref.refType(ref.types.CString);

  var user32local = ffi.Library("user32.dll", {
    EnumWindows: ["bool", [voidPtr, "int32"]],
    GetWindowTextA: ["long", ["long", stringPtr, "long"]],
  });

  windowProc = ffi.Callback("bool", ["long", "int32"], function (hwnd, lParam) {
    var buf, name, ret;
    buf = new Buffer(255);
    ret = user32local.GetWindowTextA(hwnd, buf, 255);
    name = ref.readCString(buf, 0);
    let originalTitle = "PokeMMO";
    if (name.length === 7) {
      for (let num of Array.from(Array(name.length).keys())) {
        if (name[num] === "?") {
          // console.log("index", num);
          name =
            name.substring(0, num) +
            originalTitle[num] +
            name.substring(num + 1);
        }
      }
      if (originalTitle === name) {
        const res = user32.SetWindowTextW(hwnd, Buffer.from("PokeMMO", "ucs2"));
        // if (!res) {
        //   console.log('SetWindowTextW failed')
        // }
        // else {
        //   console.log('window title changed')
        // }
        // console.log("true")
      }
      // console.log("name", name);
      // console.log("originalTitle", originalTitle);
    }
    return true;
  });
  user32local.EnumWindows(windowProc, 0);
}

class WindowCapture {
  hwnd = null;
  w = 0;
  h = 0;
  cropped_x = 0;
  cropped_y = 0;
  offset_x = 0;
  offset_y = 0;

  constructor(title) {
    changeNameWindow();
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

    const screenshot = await colorNormalize(pic);
    return screenshot;
  }

  sendKey(key) {
    user32.SendMessageW(this.hwnd);
  }
}

module.exports = WindowCapture;
