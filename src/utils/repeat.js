const sleep = require("./sleep");

async function repeat(quantity, delay, func) {
  const arr = Array.from(Array(quantity).keys());
  for (let num of arr) {
    await func();
    await sleep(delay || 1);
  }
}

module.exports = repeat;
