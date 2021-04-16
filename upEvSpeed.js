const robot = require("robotjs");

let n = 0;

const moveSweetScent = () => {
  robot.moveMouseSmooth(389, 53);
  robot.mouseClick();
};

const moveTeleport = () => {
  robot.moveMouseSmooth(435, 51);
  robot.mouseClick();
};

const bike = () => {
  robot.moveMouseSmooth(333, 49);
  robot.mouseClick();
};

const changePokemon = () => {
  robot.keyTap("s");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("d");
  sleep(300);
  robot.keyTap("q");
  sleep(300);

  sleep(25000);
};

const loop = () => {
  while (n <= 6) {
    const img = robot.screen.capture(0, 0, 1920, 1080);

    const pixel_color = img.colorAt(905, 987);

    if (pixel_color !== "c8c0b8") {
      sleep(3000);
      robot.keyTap("e");
      sleep(300);
      robot.keyTap("q");
      sleep(300);
      robot.keyTap("q");
      sleep(300);
      robot.keyTap("q");
      sleep(3000);
    }

    console.log(pixel_color);

    attack();

    n++;

    if (n === 6) {
      teleport();
    }
  }
};

const hunt = () => {
  console.log("Hunting...");
  //go to walter
  bike();
  robot.keyToggle("a", "down");
  sleep(2000);
  robot.keyToggle("a", "up");

  // use Surf

  sleep(300);
  robot.keyToggle("q", "down");
  sleep(1500);
  robot.keyToggle("q", "up");
  sleep(300);
};

const teleport = () => {
  console.log("teleport");
  moveTeleport();
  sleep(2300);
  robot.keyTap("q");
  sleep(300);
  robot.keyToggle("q", "down");
  sleep(3800);
  robot.keyToggle("q", "up");
  sleep(300);
  robot.keyToggle("s", "down");
  sleep(2000);
  robot.keyToggle("s", "up");
  n = 0;
  hunt();
};

const attack = () => {
  console.log("Attacks...");
  //attack horda
  sleep(300);
  moveSweetScent();
  sleep(17000);
  changePokemon();

  console.log("Attack");
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(10000);
};

const pokemonCenter = () => {
  console.log("Healing...");
  robot.keyToggle("e", "down");
  sleep(300);
  robot.keyToggle("w", "down");
  sleep(2800);
  robot.keyToggle("w", "up");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyToggle("q", "down");
  sleep(2900);
  robot.keyToggle("q", "up");
  sleep(300);
  robot.keyToggle("s", "down");
  sleep(2000);
  robot.keyToggle("s", "up");
};

function sleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

sleep(1000);

pokemonCenter();

sleep(300);

hunt();

sleep(300);

loop();
