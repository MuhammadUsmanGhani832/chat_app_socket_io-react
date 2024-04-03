const { Server } = require('socket.io');
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        method: ["GET", 'POST']
    }
});

const getSocketIdFromReceiverId = (receiverId) => {
    return userSocketArray[receiverId]
}

const userSocketArray = {}
io.on('connection', (socket) => {

    console.log("a user connected", socket.id, userSocketArray)

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketArray[userId] = socket.id;


    io.emit('getOnlineUsers', Object.keys(userSocketArray))
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
        delete userSocketArray[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketArray))
    })
})


module.exports = { app, io, server, getSocketIdFromReceiverId }