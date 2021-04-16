const fs = require("fs");
const path = require("path");
const configs = require("../../config.json");

const url = configs.screen_shot_folder;

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
