const { Worker } = require('shinobi-worker');
const sleep = require("./src/utils/sleep");

const createNewProcess = async () => {
  // set the first parameter as a string.
  const pathToWorkerScript = __dirname + '/src/utils/workerWindowCapture.js'
  // if you want to pass argument on execution you may set it as an Array as shown on the line below.
  // const pathToWorkerScript = [__dirname + '/newThread.js','argument1','argument2']
  const workerProcess = Worker(
    pathToWorkerScript,
    {
      json: true,
      debug: true,
    }
  )
  workerProcess.on('message', function (data) {
    // data from worker. if `json` is `true` then your data will be parsed into json automatically.
    console.log("data", data);
  })
  workerProcess.on('close', function () {
    // things to do after worker closes
    console.log("close");
  })
  workerProcess.on('error', function (data) {
    // errors from the worker process and/or script.
    console.log("error", data);

  })
  workerProcess.on('failedParse', function (stringThatFailedToParse) {
    // only work when `debug` is `true` in Worker options.
    console.log("failedParse", stringThatFailedToParse);
  })

  workerProcess.postMessage({ execRun: true });
  await sleep(5);
  workerProcess.postMessage({ execRun: false });
  console.log("stop")
  // workerProcess is an Emitter.
  // it also contains a direct handle to the `spawn` at `workerProcess.spawnProcess`
  return workerProcess
}

createNewProcess();