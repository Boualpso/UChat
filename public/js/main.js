const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username room from URL 
const{ username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//Join chatroom
socket.emit('joinRoom', {username, room});



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
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);

}