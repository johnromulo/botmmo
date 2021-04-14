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
    console.log("num", num);
    await func();
    await sleep(delay || 1);
  }
}

async function move(direction) {
  robot.keyToggle(direction, "down");
  await sleep(0.05);
  robot.keyToggle(direction, "up");
}

const SPEED_STEPS = 0.2;

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(3);
  console.log("iniciando");
  await repeat(5, SPEED_STEPS, async () => await move("s"));
  await repeat(3, SPEED_STEPS, async () => await move("a"));
  await repeat(2, SPEED_STEPS, async () => await move("s"));
  console.log("saindo do centro");
  await sleep(2);

  await repeat(15, SPEED_STEPS, async () => await move("s"));
  await repeat(5, SPEED_STEPS, async () => await move("d"));
  await repeat(10, SPEED_STEPS, async () => await move("s"));
  await repeat(2, SPEED_STEPS, async () => await move("d"));
  await repeat(9, SPEED_STEPS, async () => await move("s"));
  await repeat(6, SPEED_STEPS, async () => await move("d"));
  await repeat(11, SPEED_STEPS, async () => await move("s"));
  await repeat(4, SPEED_STEPS, async () => await move("a"));
  await repeat(2, SPEED_STEPS, async () => await move("w"));
  console.log("entrando na caverna");
  await sleep(2);

  console.log("use sweet scent");
  await repeat(1, SPEED_STEPS, async () => await move("5"));
  await sleep(12);
  console.log("atk");
  await repeat(1, SPEED_STEPS, async () => await move("q"));
  await repeat(1, SPEED_STEPS, async () => await move("d"));
  await repeat(2, SPEED_STEPS, async () => await move("q"));
  await sleep(13);
  console.log("saindo da caverna");
  await repeat(2, SPEED_STEPS, async () => await move("s"));
  await sleep(2);

  console.log("teleportando para o centro");
  await repeat(1, SPEED_STEPS, async () => await move("6"));
}

run();
