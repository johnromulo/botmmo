const exec = require("child_process").exec;
const os = require("os");

function puts(error, stdout, stderr) {
  if (error) console.error(error);
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
}

async function verifyOS() {
  // Run command depending on the OS
  if (os.type() === "Linux") {
    console.log("Linux");
  } else if (os.type() === "Darwin") {
    console.log("Mac");
    exec("npm  install mac-windows --no-save ", puts);
    exec("npm  install mac-focus-window --no-save ", puts);
  } else if (os.type() === "Windows_NT") {
    console.log("Windows");
    exec("npm  install node-process-windows --no-save ", puts);
  } else throw new Error("Unsupported OS found: " + os.type());
}

verifyOS();
