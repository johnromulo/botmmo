// const { K, U } = require("win32-api");

// require("ref-napi");

// K.load();
// const user32 = U.load();

// async function run() {
//   const winEnumHandler = (hwnd, ctx) => {
//     // console.log("exec");
//     // if (user32.IsWindowVisible(hwnd)) {
//     // console.log("-", user32.GetWindowTextW(hwnd));
//     // }
//     return true;
//   };

//   user32.EnumWindows(winEnumHandler, 0);
// }

// run();

var ref = require("ref-napi");
var ffi = require("ffi-napi");

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
  console.log(name);
  return true;
});

user32.EnumWindows(windowProc, 0);
