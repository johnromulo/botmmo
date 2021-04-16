const fs = require("fs");
const url = "../../../../Pictures/PokeMMO Screenshots";

async function getAllFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(url, (err, files) => {
      if (err) console.log("err", err);
      resolve(files);
    });
  });
}

module.exports = getAllFiles;
