const io = require('socket.io-client');

const socket = io.connect('http://localhost:4000', { reconnect: true });

const newClientConnected = (client) =>
{
    const clientId = client || `defaultID${String(Math.floor(Math.random() * 1000000))}`;
    console.log(clientId);
    socket.emit('new client', clientId);
};

newClientConnected();

socket.on('connection', () =>
{
    console.log('connection');
});
socket.on('data', (data) =>
{
    console.log('data received');
    console.log(data);
});
