// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {


  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './js/preload.js') //aqui se ejecuta nodeJS
    }
  })

  //esto lo hacemos desde el preload->renderer
  const os = require('os')
  const username = os.userInfo().username
  console.log('main.js username:', username)
  if (username !== 'rodrigoc') {
    console.error('No tiene acceso al sistema! ponerse en contacto con el administrador de sistema.')

    // https://www.electronjs.org/es/docs/latest/api/dialog#dialogshowmessageboxsyncbrowserwindow-options
    var options = {
      type: 'error',
      // buttons: ['&Yes', '&No'],
      title: 'Acceso denegado',
      // icon: dialogIcon,
      normalizeAccessKeys: true,
      message: 'No tiene acceso al sistema! ponerse en contacto con el administrador de sistema'
    };

    const win = BrowserWindow.getFocusedWindow();
    const { dialog } = require('electron')
    dialog.showMessageBoxSync(win, options)
      // .then((choice) => {
      //   if (choice.response === 0) {
      //     quitApplication();
      //   }
      // }).catch(err => {
      //   console.log('ERROR', err);
      // });

    process.exit()
  }


  // rc95 12/08/2022 02:40 - Communicating between processes
  const { ipcMain } = require('electron')
  ipcMain.handle('ping', () => 'pong')

  const { nativeTheme } = require('electron')
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })


  // and load the index.html of the app.
  mainWindow.loadFile('./views/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}


// rc95 12/08/2022 03:04 - https://www.electronjs.org/docs/latest/tutorial/notifications#show-notifications-in-the-main-process
const { Notification } = require('electron')
const NOTIFICATION_TITLE = 'Basic Notification - FROM MAIN.js'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // })
}).then(showNotification)





// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//rc95 12/08/2022 02:17
const mi_bd = require('../db/db')
const main = async () => {
  const db = await mi_bd.obtener_bd()

  await mi_bd.crear_y_poblar_tabla_usuarios(db)
  await mi_bd.crear_y_poblar_tabla_notas(db)
}

main()