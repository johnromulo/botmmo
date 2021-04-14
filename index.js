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
    func();
    await sleep(delay || 1);
  }
}

const SPEED_STEPS = 0.07;

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(3);
  console.log("iniciando");
  await repeat(5, SPEED_STEPS, () => robot.keyTap("s"));
  await repeat(3, SPEED_STEPS, () => robot.keyTap("a"));
  await repeat(2, SPEED_STEPS, () => robot.keyTap("s"));
  console.log("saindo do centro");
  await sleep(3);

  await repeat(15, SPEED_STEPS, () => robot.keyTap("s"));
  await repeat(5, SPEED_STEPS, () => robot.keyTap("d"));
  await repeat(10, SPEED_STEPS, () => robot.keyTap("s"));
  await repeat(2, SPEED_STEPS, () => robot.keyTap("d"));
  await repeat(9, SPEED_STEPS, () => robot.keyTap("s"));
  await repeat(5, SPEED_STEPS, () => robot.keyTap("d"));
  await repeat(11, SPEED_STEPS, () => robot.keyTap("s"));
  await repeat(4, SPEED_STEPS, () => robot.keyTap("a"));
}

run();
