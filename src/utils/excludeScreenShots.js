const fs = require("fs");
const path = require("path");

const url = "../../../../Pictures/PokeMMO Screenshots";

async function excludeScreenShots(files) {
  return new Promise((resolve, reject) => {
    files.forEach((file, index) => {
      fs.unlink(path.join(url, file), (err) => {
        if (err) throw err;
        if (files.length === index + 1) {
          resolve();
        }
      });
    });
  });
}

module.exports = excludeScreenShots;
