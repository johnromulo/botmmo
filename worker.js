const sleep = require("./src/utils/sleep");

const { buildParentPort } = require('shinobi-worker');
const parentPort = buildParentPort({
  json: true,
  debug: true,
  uncaughtException: true
})
parentPort.on('message', (data) => {
  // console.log("child message", data);
});

const postMessageToParent = (json) => {
  // console.log("child postMessageToParent", json);
  return parentPort.postMessage(json)
}

const postErrorToParent = function (text) {
  // console.log("child postErrorToParent", text);

  return parentPort.postError(text)
}

async function run() {
  await sleep(1);
  postMessageToParent({ text: "hello word!!" })
}

run();