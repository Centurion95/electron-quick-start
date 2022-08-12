// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.



// Access Node.js from the renderer with a preload script

window.addEventListener('DOMContentLoaded', () => {
  //rc95 12/08/2022 02:17
  const getDate = require('../utils/getDate')

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  console.log(getDate() + ' >>> chrome', process.versions['chrome'])
  console.log(getDate() + ' >>> node', process.versions['node'])
  console.log(getDate() + ' >>> electron', process.versions['electron'])
  //aqui reemplaza el html de index.html
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

})

// rc95 12/08/2022 02:40 - Communicating between processes
// inter-process communication (IPC)
// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload#communicating-between-processes
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})


// https://stackoverflow.com/questions/46316281/outputting-the-username-in-electron
const os = require('os')
const username = os.userInfo().username
console.log('username:', username)
contextBridge.exposeInMainWorld('username', username)
/* 
  Also (at least on Mac OS X and Linux) it can be obtained through the LOGNAME or USER environment variables:
  username = process.env["LOGNAME"];
  // or
  username = process.env["USER"];
*/