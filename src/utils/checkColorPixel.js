const { createCanvas, loadImage } = require("canvas");
const configs = require("../../config.json");

const url = configs.screen_shot_folder;

async function checkColorPixel(file, coordinates) {
  const img = await loadImage(`${url}/${file}`);
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(1024, 768);
    canvas.width = 1024;
    canvas.height = 768;

    canvas.getContext("2d").drawImage(img, 0, 0, 1024, 768);
    var pixelData = canvas
      .getContext("2d")
      .getImageData(coordinates.x, coordinates.y, 1, 1).data;
    resolve(pixelData);
  });
}

module.exports = checkColorPixel;
