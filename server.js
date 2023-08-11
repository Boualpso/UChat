const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));


//Run when client connects
io.on('connection',socket => {
    
    //Broadcast only to said user
    socket.emit('message', 'Welcome to UChat!');

    //Broadcast when a user connectsto everyone except said user 
    socket.broadcast.emit('message', 'A user has joined the chat');

    //Runs when clien disconnects 
    socket.on('disconnect', () => {
        //Broadcast to everyone 
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
});

const PORT = 3000 || process.nextTick.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


