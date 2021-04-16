const robot = require("robotjs");
const img = require("../../../../../johnromulo/Pictures/PokeMMO Screenshots/screenshot_1618505189.png");

const sleep = require("./src/utils/sleep");
const repeat = require("./src/utils/repeat");
const customKeyTap = require("./src/utils/customKeyTap");

const config = {
  sweet_scent_key: "5",
  teleport_key: "6",
  speed_steps: 0.2,
  sweet_scent_amount_use: 6,
};

const SPEED_STEPS = config.speed_steps;

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(5);
  console.log("iniciando");

  await repeat(2, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(5, SPEED_STEPS, async () => await customKeyTap("d"));
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("s"));
  console.log("saindo do centro");
  await sleep(3);
  await repeat(4, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(5, SPEED_STEPS, async () => await customKeyTap("d"));
  await repeat(3, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(10, SPEED_STEPS, async () => await customKeyTap("d"));

  let num = 0;
  const q4 = async () => {
    if (num <= 250) {
      console.log("pescando, num", num);
      await repeat(1, SPEED_STEPS, async () => await customKeyTap("4"));
      await sleep(2);
      await repeat(1, SPEED_STEPS, async () => await customKeyTap("q"));
      num++;
      await q4();
    }
  };

  await q4();

  console.log("esperando tempo de batalha");
  await sleep(13.5);
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("q"));
  await sleep(12);
  console.log("teleportando para o centro");
  await repeat(
    1,
    SPEED_STEPS,
    async () => await customKeyTap(config.teleport_key)
  );

  await sleep(5);
  console.log("curando");
  await repeat(7, 1.5, async () => await customKeyTap("q"));

  await sleep(1);
  await run();
}

run();

// 51befc

// #114245
// #5a7d74
// #c7c2ab
