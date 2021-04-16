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

const hunt = () => {
  console.log("Hunting...");
  //go to walter
  bike();
  robot.keyToggle("a", "down");
  sleep(430);
  robot.keyToggle("a", "up");
  sleep(300);
  robot.keyToggle("w", "down");
  sleep(2000);
  robot.keyToggle("w", "up");
  sleep(300);
  robot.keyToggle("a", "down");
  sleep(800);
  robot.keyToggle("a", "up");
  sleep(300);
  robot.keyToggle("s", "down");
  sleep(800);
  robot.keyToggle("s", "up");
  sleep(300);
  robot.keyToggle("a", "down");
  sleep(800);
  robot.keyToggle("a", "up");
  sleep(300);
  robot.keyToggle("w", "down");
  sleep(800);
  robot.keyToggle("w", "up");

  // use Surf

  sleep(300);
  robot.keyToggle("q", "down");
  sleep(1500);
  robot.keyToggle("q", "up");
  sleep(300);
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
      if (pixel_color !== "c8c0b8") {
        sleep(8000);
        robot.keyTap("e");
        sleep(300);
        robot.keyTap("q");
        sleep(300);
        robot.keyTap("q");
        sleep(300);
        robot.keyTap("q");
        sleep(3000);
      }
      teleport();
    }
  }
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

  moveSweetScent();
  sleep(17000);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(300);
  robot.keyTap("q");
  sleep(10000);
};

const fly = () => {
  robot.moveMouseSmooth(666, 54);
  robot.mouseClick();
  sleep(300);
  robot.mouseClick();
  sleep(300);
  robot.moveMouseSmooth(1243, 744);
  robot.mouseClick();
  sleep(300);
  robot.mouseClick();
  sleep(300);
  robot.mouseClick();
  sleep(300);

  robot.moveMouseSmooth(857, 619);
  robot.mouseClick();
  sleep(300);
  robot.moveMouseSmooth(854, 617);
  robot.mouseClick();
  sleep(8100);
};

const openApp = () => {
  robot.keyTap("command");

  robot.typeString("PokeMMO");

  robot.keyTap("enter");
};

const login = () => {
  robot.moveMouseSmooth(1084, 607);
  robot.mouseClick();

  sleep(3000);

  robot.moveMouseSmooth(1102, 502);
  robot.mouseClick();

  sleep(5000);

  robot.moveMouseSmooth(993, 508);
  robot.mouseClick();
};

function sleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

const pokemonCenter = () => {
  console.log("Healing...");
  robot.keyToggle("e", "down");
  sleep(300);
  robot.keyToggle("w", "down");
  sleep(2000);
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

// sleep(3000);

// openApp();

// sleep(9000);

// login();

sleep(1000);

// fly();

// sleep(8100);

pokemonCenter();

sleep(1000);

hunt();

sleep(1000);

loop();
