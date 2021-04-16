const robot = require("robotjs");

const sleep = require("./src/utils/sleep");
const repeat = require("./src/utils/repeat");
const customKeyTap = require("./src/utils/customKeyTap");
const moveBike = require("./src/utils/moveBike");
const getAllFiles = require("./src/utils/getAllFiles");
const excludeScreenShots = require("./src/utils/excludeScreenShots");
const checkColorPixel = require("./src/utils/checkColorPixel");

const config = {
  sweet_scent_key: "5",
  teleport_key: "6",
  bike_key: "1",
  print_key: "0",
  speed_steps: 0.2,
  sweet_scent_amount_use: 6,
  pp: 32,
};

const SPEED_STEPS = config.speed_steps;
let pp = config.pp;

async function checkbattle() {
  return new Promise(async (resolve, reject) => {
    const filesToExclude = await getAllFiles();
    if (filesToExclude.length > 0) {
      await excludeScreenShots(filesToExclude);
    }

    console.log("print checkbattle");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(config.print_key)
    );

    const files = await getAllFiles();

    const color = await checkColorPixel(files[0], { x: 1024, y: 1 });
    if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
      console.log("batalha");
      resolve(true);
    } else {
      console.log("andando");
      resolve(false);
    }
  });
}

async function checkHorda() {
  return new Promise(async (resolve, reject) => {
    const filesToExclude = await getAllFiles();
    if (filesToExclude.length > 0) {
      await excludeScreenShots(filesToExclude);
    }

    console.log("print checkHorda");
    await repeat(
      1,
      SPEED_STEPS,
      async () => await customKeyTap(config.print_key)
    );

    const files = await getAllFiles();

    const color = await checkColorPixel(files[0], { x: 150, y: 102 });
    if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
      console.log("sem horda");
      resolve(false);
    } else {
      console.log("horda");
      resolve(true);
    }
  });
}

async function battle() {
  console.log("entrando na batalha");
  await sleep(9);
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("a"));
  await sleep(2);
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("w"));
  const isHorda = await checkHorda();
  if (isHorda) {
    await repeat(6, SPEED_STEPS, async () => await customKeyTap("d"));
    await sleep(2);
    await repeat(6, SPEED_STEPS, async () => await customKeyTap("s"));
    await repeat(2, SPEED_STEPS, async () => await customKeyTap("q"));
    await sleep(8);
    await goToCenter();
  }
  console.log("atk");
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("q"));
  await sleep(12);
  const isbattle = await checkbattle();
  if (isbattle) {
    await sleep(8);
    console.log("atk 2");
    await repeat(1, SPEED_STEPS, async () => await customKeyTap("q"));
    await repeat(1, SPEED_STEPS, async () => await customKeyTap("s"));
    await repeat(1, SPEED_STEPS, async () => await customKeyTap("s"));
    await sleep(12);
  }
  console.log("saindo da batalha");
  pp--;
  console.log(`restam ${pp}s`);
  if (pp <= 2) {
    await goToCenter();
  } else {
    await resetRoute();
    await route();
  }
}

async function goToCenter() {
  console.log("teleportando para o centro pokemon");
  await repeat(
    1,
    SPEED_STEPS,
    async () => await customKeyTap(config.teleport_key)
  );

  await sleep(5);
  console.log("curando");
  await repeat(7, 1.5, async () => await customKeyTap("q"));
  pp = config.pp;
  await sleep(1);
  await run();
}

async function resetRoute() {
  console.log("resetando rota");
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("d"));
  await sleep(4);
}

async function route() {
  console.log("seguindo rota");
  await repeat(4, SPEED_STEPS, async () => await customKeyTap("w"));
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("a"));
  await repeat(3, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(5, SPEED_STEPS, async () => await customKeyTap("a"));
  await repeat(2, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(6, SPEED_STEPS, async () => await customKeyTap("d"));

  const isbattle = await checkbattle();
  if (isbattle) {
    await battle();
  } else {
    await route();
  }
}

async function run() {
  console.log("Coloque o pokemmo em foco");
  await sleep(5);
  console.log("iniciando");

  await repeat(6, SPEED_STEPS, async () => await customKeyTap("s"));
  console.log("saindo do centro");
  await sleep(2);
  console.log("segingo para rota de farm");

  // await repeat(7, SPEED_STEPS, async () => await customKeyTap("a"));
  // await repeat(5, SPEED_STEPS, async () => await customKeyTap("w"));
  // await repeat(2, SPEED_STEPS, async () => await customKeyTap("d"));
  // await repeat(15, SPEED_STEPS, async () => await customKeyTap("w"));
  // await repeat(17, SPEED_STEPS, async () => await customKeyTap("a"));
  // await repeat(3, SPEED_STEPS, async () => await customKeyTap("w"));
  // await repeat(6, SPEED_STEPS, async () => await customKeyTap("a"));
  // await repeat(4, SPEED_STEPS, async () => await customKeyTap("s"));
  await repeat(1, SPEED_STEPS, async () => await customKeyTap(config.bike_key));
  await sleep(1);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("a"));
  await moveBike("a", 0.28);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("w"));
  await moveBike("w", 1.45);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("a"));
  await moveBike("a", 1.38);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("w"));
  await moveBike("w", 0.15);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("a"));
  await moveBike("a", 0.35);
  await repeat(1, SPEED_STEPS, async () => await customKeyTap("s"));
  await moveBike("s", 0.214);

  console.log("iniciando rota de farm");
  await resetRoute();
  const isbattle = await checkbattle();
  if (isbattle) {
    await battle();
  }
  await route();
}

run();

// 14 p/s

/*
  1s = 14
  x = 4
  x= 4/14; 
*/
