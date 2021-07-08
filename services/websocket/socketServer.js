/*const http = require('http');
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message From Server!!')
  })*/

const socket = require("socket.io");
//var io;

class WebSocketIO {

  static init(server) {
      if (this.io) return this.io
      this.io = socket(server);
      this.wsClients = []
      //console.log(this.wsClients)

      this.io.on("connection", function (socket) {
        console.log("Made socket connection");
      
        socket.on("new client", function (data) {
          socket.clientId = data;
          WebSocketIO.wsClients.push(data);
          console.log(WebSocketIO.wsClients)
          WebSocketIO.io.emit("new client", [this.wsClients]);
        });
      
        socket.on("disconnect", () => {
          const index = WebSocketIO.wsClients.indexOf(socket.clientId);
          if (index > -1) {
            WebSocketIO.wsClients.splice(index, 1);
          }
          //WebSocketIO.io.emit("client disconnected", socket.clientId);
        });

      });

      global.on("loto", (data) => {
        this.sendData(data)
      })


      return this.io
  }

  static sendData(data){
  //console.log("send data")
    if (WebSocketIO.io != null){
      WebSocketIO.io.emit("data", data)
      //console.log("transmitting")
      return(1)
    }
    return(0)

  }
  

}

WebSocketIO.io = null
WebSocketIO.wsClients = []


/*function initSocket(server){
  io = socket(server);
  
  const wsClients = []
  io.on("connection", function (socket) {
    console.log("Made socket connection");
  
    socket.on("new client", function (data) {
      socket.clientId = data;
      wsClients.push(data);
      io.emit("new client", [wsClients]);
    });
  
    socket.on("disconnect", () => {
      const index = array.indexOf(socket.clientId);
      if (index > -1) {
        wsClients.splice(index, 1);
      }
      //io.emit("client disconnected", socket.clientId);
    });
  });
}

function sendData(data){
  console.log("send data")
  if (io != null){
    io.emit("data", data)
  }
}

module.exports = {
  initSocket, sendData
}*/

module.exports = { WebSocketIO }
