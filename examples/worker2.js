const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const sleep = require("./src/utils/sleep");
// const Detection = require("../../Classes/Detection");
// const Vision = require("../../Classes/Vision");
// const WindowCapture = require("../../Classes/WindowCapture");

const workertest = workerData => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: {} });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

const workertest2 = async workerData => {
  const worker = new Worker(__filename, {
    workerData: {}
  });
  worker.on('message', (msg) => workerData.port.postMessage(msg));
  worker.on('error', (err) => console.log("workertest2 err", err));
  worker.on('exit', code => {
    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
  });

  await sleep(5);

  worker.postMessage({ execRun: true });
  await sleep(5);
  worker.postMessage({ execRun: false });
};
/**
 * If it's not the main thread it's one of the Worker threads
 */
// if (!isMainThread) {
//   const sharedArray = workerData.arr;
//   const result = workerData.iterations * 2 + workerData.position
//   /**
//    * Adds items to the shared array in a safe way
//    */
//   Atomics.add(sharedArray, workerData.position, result.ms);
//   parentPort.postMessage(sharedArray);
// }


if (!isMainThread) {
  let execRun = false;

  parentPort.on('message', (data) => {
    // console.log("data", data);
    // if (data.execRun) {
    execRun = data.execRun;
    // }
  });

  const run = async () => {
    console.log("execRun", execRun);
    if (execRun) {
      console.log("run");
      parentPort.postMessage({ detector_points: [] });
    }
    await sleep(1);
    run();
  }

  run();
}


module.exports = { workertest: workertest2 };