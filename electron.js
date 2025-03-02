const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 100,
        height: 75,
        frame: false,
        minWidth: 1000,
        minHeight: 750,
        transparent: true,
        alwaysOnTop: true,

        webPreferences: {
            nodeIntegration: true,
        },
    });   

    const isDev = process.env.NODE_ENV === "development";
    const startUrl = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "build", "index.html")}`;

    mainWindow.loadURL(startUrl);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});