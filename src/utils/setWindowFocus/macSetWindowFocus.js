const getWindows = require("mac-windows").getWindows;
const focusWindow = require("mac-focus-window");
const robot = require("robotjs");

/*
{
    pid: 320,
    ownerName: 'Finder',
    name: 'Desktop',
    width: 770,
    height: 436,
    x: 295,
    y: 100,
    number: 1027
  }
*/
async function setWindowFocus() {
  return new Promise(async (resolve, reject) => {
    if (focusWindow.isSupported && !focusWindow.hasPermissions()) {
      console.log("permission");
      focusWindow.requestPermissions();
      // throw new Error("Adcionar permição para foco de tela no mac");
    }
    const windows = await getWindows();
    // console.log("windows", windows);
    if (!windows) {
      throw new Error("Nenhuma tela encontrada");
    }
    const pokemmoWindow = windows.find((window) => window.ownerName === "java");
    if (!pokemmoWindow) {
      throw new Error("Janela do Pokemmo não encontrada");
    }
    robot.moveMouse(pokemmoWindow.x + 500, pokemmoWindow.y);
    robot.mouseClick();
    const focus = focusWindow(`${pokemmoWindow.number}`);
    console.log("focus", focus);
    resolve(focus);
  });
}

module.exports = setWindowFocus;
