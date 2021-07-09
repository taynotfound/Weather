// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  session
} = require('electron')
const path = require('path')
const iconPath = path.join(__dirname, "./icon/icon.png");



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    icon: iconPath
  })



  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.setMenuBarVisibility(false)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async() => {
  createWindow()
  const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
  console.log("penis")
  session.defaultSession.cookies.set(cookie)
  .then(() => {
    console.log("allo")
  }, (error) => {
    console.error(error)
  })
  const cookies = await session.defaultSession.cookies.get({url : "http://www.github.com"}) // here you find the cookies tayron l
  console.log(cookies)
  app.on('activate', async function () {
    
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) await createWindow()
    console.log("penis")



  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.