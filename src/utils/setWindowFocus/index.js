const os = require("os");
const macSetWindowFocus = require("./macSetWindowFocus");

async function run() {
  if (os.type() === "Linux") {
    console.log("Linux");
  } else if (os.type() === "Darwin") {
    console.log("Mac");
    await macSetWindowFocus();
  } else if (os.type() === "Windows_NT") {
    console.log("Windows");
  } else throw new Error("Unsupported OS found: " + os.type());
}

run();
