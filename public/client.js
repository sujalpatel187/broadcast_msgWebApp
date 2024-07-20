

const socket = io()
let textarea = document.querySelector('#textarea')
let msgArea = document.querySelector('.messageArea')
let name;
do {
    name = prompt("Please Enter your name:")
} while (!name);


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendmessage(e.target.value);
    }
})

function sendmessage(msge) {
    let msg = {
        user: name,
        message: msge.trim()
    }

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottam()

    socket.emit('message', msg)
}

function appendMessage(msg, type) {

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    msgArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottam()
})

function scrollToBottam() {
    msgArea.scrollTop = msgArea.scrollHeight
}