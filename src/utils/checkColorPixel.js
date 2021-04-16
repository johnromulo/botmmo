const { createCanvas, loadImage } = require("canvas");
const configs = require("../../config.json");

const url = configs.screen_shot_folder;

async function checkColorPixel(file, coordinates) {
  const img = await loadImage(`${url}/${file}`);
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(
      configs.resolution.width,
      configs.resolution.height
    );
    canvas.width = configs.resolution.width;
    canvas.height = configs.resolution.height;

    canvas
      .getContext("2d")
      .drawImage(
        img,
        0,
        0,
        configs.resolution.width,
        configs.resolution.height
      );
    var pixelData = canvas
      .getContext("2d")
      .getImageData(coordinates.x, coordinates.y, 1, 1).data;
    resolve(pixelData);
  });
}

module.exports = checkColorPixel;
