const getWindows = require("mac-windows").getWindows;
const focusWindow = require("mac-focus-window");

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
    if (!focusWindow.isSupported && !focusWindow.hasPermissions()) {
      focusWindow.requestPermissions();
      throw new Error("Adcionar permição para foco de tela no mac");
    }
    const windows = await getWindows();
    if (!windows) {
      throw new Error("Nenhuma tela encontrada");
    }
    const pokemmoWindow = windows.find(
      (window) => window.ownerName === "Pokemmo"
    );
    if (!pokemmoWindow) {
      throw new Error("Janela do Pokemmo não encontrada");
    }
    focusWindow(pokemmoWindow.number);
  });
}

module.exports = setWindowFocus;
