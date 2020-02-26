const sockets = module.exports;

sockets.connectToSocket = server => {
    const io = require('socket.io').listen(server);

    io.on('connection', () => {
        console.log('Connected!');
    });

    sockets.io = io;
};
