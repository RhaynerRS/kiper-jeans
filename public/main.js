const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    icon: "../public/icon.png",
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    webPreferences: {
      enableRemoteMode: true,
    },
    autoHideMenuBar: true,
  });
  win.loadURL(
    isDev ? "https://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
  //win.setMenu(null);
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
