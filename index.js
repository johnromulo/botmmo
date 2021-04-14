const robot = require("robotjs");

async function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, sec * 1000);
  });
}

async function repeat(quantity, delay, func) {
  const arr = Array.from(Array(quantity).keys());
  for (let num of arr) {
    await func();
    await sleep(delay || 1);
  }
}

async function customKeyTap(direction) {
  robot.keyToggle(direction, "down");
  await sleep(0.05);
  robot.keyToggle(direction, "up");
}

const config = {
  sweet_scent_key: "5",
  teleport_key: "6",
  speed_steps: 0.2,
  sweet_scent_amount_use: 5,
};

const SPEED_STEPS = config.speed_steps;

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(3);
  console.log("iniciando");
  await repeat(5, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(3, SPEED_STEPS, async () => await customKeyTap("a"));
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("s"));
  console.log("saindo do centro");
  await sleep(2);

  await repeat(15, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(5, SPEED_STEPS, async () => await customKeyTap("d"));
  await repeat(10, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("d"));
  await repeat(9, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("d"));
  await repeat(11, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(4, SPEED_STEPS, async () => await customKeyTap("a"));
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("w"));
  console.log("entrando na caverna");
  await sleep(2);

  const arr = Array.from(Array(config.sweet_scent_key).keys());
  for (let num of arr) {
    console.log("usando sweet scent");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(config.sweet_scent_key)
    );
    await sleep(12);
    console.log("atk");
    await repeat(1, SPEED_STEPS, async () => await customKeyTap("q"));
    await repeat(1, SPEED_STEPS, async () => await customKeyTap("d"));
    await repeat(2, SPEED_STEPS, async () => await customKeyTap("q"));
    await sleep(13);
    console.log("saindo da caverna");
    await repeat(2, SPEED_STEPS, async () => await customKeyTap("s"));
    await sleep(2);
  }

  console.log("teleportando para o centro");
  await repeat(
    1,
    SPEED_STEPS,
    async () => await customKeyTap(config.teleport_key)
  );
}

run();
