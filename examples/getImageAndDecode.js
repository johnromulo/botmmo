import Tesseract from "tesseract.js";
import robot from "robotjs";
import Jimp from "jimp";

const sleep = (n) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
};

const decode = (img) => {
  Tesseract.recognize(img, "eng").then(({ data: { text } }) => {
    const splited = text.replace(/[^a-zA-Z ]/g, "").split(" ");
    console.log(` Pokemons: ${splited.filter(
      (name) => name !== "Nv" && name !== ""
    )}
   Shiny: ${splited.includes("Shiny")}
   Horda: ${splited.filter((name) => name !== "Nv" && name !== "").length > 1}
  `);
  });
};

const colorNormalize = (robotScreenPic) => {
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

      image.getBase64(Jimp.MIME_PNG, (err, res) => {
        decode(res);
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

sleep(1000);

// var pic = robot.screen.capture(550, 85, 850, 150);
var pic = robot.screen.capture(200, 70, 1720, 250);

colorNormalize(pic, "picture.jpg");
