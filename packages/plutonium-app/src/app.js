import { app, BrowserWindow, ipcMain } from 'electron';
import path                            from 'path';
import url                             from 'url';

let mainWindow;
let printWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 350,
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './pages/main.html'),
        protocol: 'file:',
        slashes : true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('print-passphrase', (event, arg) => {
    printWindow = new BrowserWindow({
        parent: mainWindow,
        show  : false
    });

    printWindow.webContents.on('did-finish-load', () => {
        printWindow.webContents.send('set-passphrase', arg);
        printWindow.webContents.print();
    });

    printWindow.setMenu(null);

    printWindow.loadURL(url.format({
        pathname: path.join(__dirname, './pages/print.html'),
        protocol: 'file:',
        slashes : true
    }));

    printWindow.on('closed', () => {
        printWindow = null;
    });
});
