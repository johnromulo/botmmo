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
  sweet_scent_amount_use: 6,
};

const SPEED_STEPS = config.speed_steps;

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(3);
  console.log("iniciando");
  await repeat(
    5,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await repeat(
    3,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.left)
  );
  await repeat(
    2,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  console.log("saindo do centro");
  await sleep(2);

  await repeat(
    15,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await repeat(
    5,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.right)
  );
  await repeat(
    10,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await repeat(
    2,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.right)
  );
  await repeat(
    9,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await repeat(
    6,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.right)
  );
  await repeat(
    11,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await repeat(
    4,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.left)
  );
  await repeat(2, SPEED_STEPS, async () => await customKeyTap(configs.keys.up));
  console.log("entrando na caverna");
  await sleep(2);

  const arr = Array.from(Array(config.sweet_scent_amount_use).keys());
  for (let num of arr) {
    console.log("usando sweet scent");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(config.sweet_scent_key)
    );
    await sleep(16);
    console.log("atk");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(configs.keys.button_z)
    );
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(configs.keys.right)
    );
    await repeat(
      2,
      SPEED_STEPS,
      async () => await customKeyTap(configs.keys.button_z)
    );
    await sleep(14);

    console.log("skipando novo atk");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(configs.keys.button_b)
    );
    await sleep(3);
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(configs.keys.button_z)
    );
    await sleep(8);
  }

  console.log("saindo da caverna");
  await repeat(
    2,
    SPEED_STEPS,
    async () => await customKeyTap(configs.keys.down)
  );
  await sleep(2);

  console.log("teleportando para o centro");
  await repeat(
    1,
    SPEED_STEPS,
    async () => await customKeyTap(config.teleport_key)
  );

  await sleep(5);
  console.log("curando");
  await repeat(7, 1.5, async () => await customKeyTap(configs.keys.button_z));

  await sleep(1);
  await run();
}

run();
