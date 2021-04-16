const os = require("os");
const macSetWindowFocus = require("./macSetWindowFocus");

async function setWindowFocus() {
  return new Promise(async (resolve, reject) => {
    if (os.type() === "Linux") {
      console.log("Linux");
      resolve(false);
    } else if (os.type() === "Darwin") {
      console.log("Mac");
      const macReturn = await macSetWindowFocus();
      resolve(macReturn);
    } else if (os.type() === "Windows_NT") {
      console.log("Windows");
      resolve(false);
    } else throw new Error("Unsupported OS found: " + os.type());
  });
}

module.exports = setWindowFocus;
