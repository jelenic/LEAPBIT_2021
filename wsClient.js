var io = require('socket.io-client');
var socket = io.connect('http://localhost:4000', {reconnect: true});


const newClientConnected = (client) => {
    clientId = client || "defaultID" + String(Math.floor(Math.random() * 1000000));
    console.log(clientId);
    socket.emit("new client", clientId);
  };

newClientConnected();

socket.on('connection', function (socket){
    console.log('connection');
 });
 socket.on('data', function (data) {
    console.log("data received")
    console.log(data);
});

