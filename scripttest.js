const sleep = require("./src/utils/sleep");


async function detection() {
  console.log("Print");
  await sleep(1);
}


let bot_stage = 0
let runbot = false;
async function bot() {
  console.log("bot");
  if (!runbot) {
    runbot = true;
    switch (bot_stage) {
      case 0:
        console.log("bot 0");

        await sleep(5);
        bot_stage = 1;
        break;
      case 1:
        console.log("bot 1");
        await sleep(5);
        bot_stage = 2;
        break;
      case 2:
        console.log("bot 2");
        await sleep(5);
        bot_stage = 0;
        break;
      default:
        console.log("defaut");
        break;
    }
    runbot = false;
  }

}

async function run() {
  await detection();
  bot();
  await sleep(1);
  run();
}


async function init() {
  console.log("init");
  await sleep(3);
  console.log("run");
  await run();
}

init();

