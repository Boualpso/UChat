const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, room} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'UChat Bot';


//Run when client connects
io.on('connection', socket => {
    socket.on('joinRom', ({ usernamme, room }) => {

        socket.join();

        //Broadcast only to said user
        socket.emit('message', formatMessage(botName, 'Welcome to UChat!'));

        //Broadcast when a user connectsto everyone except said user 
        socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

        //Runs when clien disconnects 
        socket.on('disconnect', () => {

            //Broadcast to everyone 
            io.emit('message', formatMessage(botName, 'A user has left the chat'));
        });

    });




    //Listen for chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });

});

const PORT = 3000 || process.nextTick.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


