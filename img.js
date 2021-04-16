// const img = require("../../../../../johnromulo/Pictures/PokeMMO Screenshots/screenshot_1618505189.png");
// const img = require("./images-testes/battle.png");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Coordenadas
// hp pokemon 1 (977, 294, 1, 1)
// check battle (1024, 1, 1, 1)
// horda (150,102 ,1 ,1)

const url = "./images-testes/semhorda.png";
async function run() {
  try {
    const canvas = createCanvas(1024, 768);

    canvas.width = 1024;
    canvas.height = 768;
    const img = await loadImage(url);
    console.log("img", img);

    canvas.getContext("2d").drawImage(img, 0, 0, 1024, 768);
    var pixelData = canvas.getContext("2d").getImageData(150, 102, 1, 1).data;
    // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    console.log("image", pixelData);
  } catch (error) {
    console.log("error", error);
  }
}

// rgba(140, 196, 84, 1);

// rgba(253, 253, 253, 255);
run();
