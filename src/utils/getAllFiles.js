const fs = require("fs");
const configs = require("../../config.json");

const url = configs.screen_shot_folder;

async function getAllFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(url, (err, files) => {
      if (err) console.log("err", err);
      resolve(files);
    });
  });
}

module.exports = getAllFiles;
