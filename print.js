const robot = require("robotjs");
let Jimp = require("jimp");
const Discord = require("discord.js");
const client = new Discord.Client();

const print = () => {
  var pic = robot.screen.capture(0, 0, 1920, 1080);
  colorNormalize(pic, "t.jpg");
};

sleep(1000);

robot.keyTap("c");

sleep(500);

print();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "!status") {
    msg.channel.send({
      files: ["./t.jpg"],
    });
  }
});

client.login("bot-token");

function sleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function colorNormalize(robotScreenPic, path) {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
      let pos = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
      });
      image.write(path, resolve);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
