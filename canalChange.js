const robot = require("robotjs");

const chanel_1 = 548;
const chanel_2 = 572;
const chanel_3 = 587;
const chanel_4 = 619;
const chanel_5 = 648;

const changeCanal = () => {
  robot.moveMouse(1742, 1059);
  robot.mouseClick();
  sleep(2000);
  robot.moveMouse(1742, 971);
  robot.mouseClick();
  sleep(2000);
  robot.moveMouse(989, 501);
  robot.mouseClick();
  sleep(2000);

  // select chanel

  robot.moveMouse(989, chanel_2);
  robot.mouseClick();
  sleep(2000);
  robot.moveMouse(993, 571);
  robot.mouseClick();
};

function sleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

sleep(1000);
changeCanal();
