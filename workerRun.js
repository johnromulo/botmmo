const { MessageChannel } = require('worker_threads');
const { workerWindowCapture } = require("./src/utils/workerWindowCapture");
const sleep = require("./src/utils/sleep");

const { port1, port2 } = new MessageChannel();

async function run() {
  port1.on('message', (result) => {
    console.log("port", result);
  });

  workerWindowCapture({ port: port2 });

  await sleep(5);
  port1.postMessage({ execRun: true });

  await sleep(5);

  port1.postMessage({ execRun: false });
}

run();