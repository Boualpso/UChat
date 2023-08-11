const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


const socket = io();


socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message value
    const msg = e.target.elements.msg.value;

    //Emit message
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Charbel <span> 9:12</span></p>
    <p class="text">
    ${message}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);

}