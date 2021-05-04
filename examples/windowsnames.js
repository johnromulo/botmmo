var ref = require("ref-napi");
var ffi = require("ffi-napi");

const { K, U } = require("win32-api");
require("ref-napi");

K.load();
const user32api = U.load();

var voidPtr = ref.refType(ref.types.void);
var stringPtr = ref.refType(ref.types.CString);

var user32 = ffi.Library("user32.dll", {
  EnumWindows: ["bool", [voidPtr, "int32"]],
  GetWindowTextA: ["long", ["long", stringPtr, "long"]],
});

windowProc = ffi.Callback("bool", ["long", "int32"], function (hwnd, lParam) {
  var buf, name, ret;
  buf = new Buffer(255);
  ret = user32.GetWindowTextA(hwnd, buf, 255);
  name = ref.readCString(buf, 0);
  let originalTitle = "PokeMMO";
  if (name.length === 7) {
    for (let num of Array.from(Array(name.length).keys())) {
      if (name[num] === "?") {
        console.log("index", num);
        name = name.substring(0, num) + originalTitle[num] + name.substring(num + 1);
      }
    }
    if (originalTitle === name) {
      // const res = user32api.SetWindowTextW(hwnd, Buffer.from('PokeMMO', 'ucs2'))

      // if (!res) {
      //   console.log('SetWindowTextW failed')
      // }
      // else {
      //   console.log('window title changed')
      // }
      console.log("true")
    }


    console.log("name", name);
    console.log("originalTitle", originalTitle);
  }
  // console.log(name, "-", name.length);
  return true;
});

user32.EnumWindows(windowProc, 0);
