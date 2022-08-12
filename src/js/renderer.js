// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



// Bonus: Add functionality to your web contents
//rc95 12/08/2022 02:17
console.log(' >>> hola mundo')

// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload#communicating-between-processes
const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}
func()


// https://www.electronjs.org/docs/latest/tutorial/dark-mode
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})


// https://www.electronjs.org/docs/latest/tutorial/notifications
const NOTIFICATION_TITLE = 'Title - from RENDERER.js'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE

const get_mi_username = async () => {
    const mi_username = await username
    document.getElementById('lblUsername').innerHTML = mi_username
}
get_mi_username()