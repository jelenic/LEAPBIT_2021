const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


const wsServ = require('./services/websocket/socketServer')


const port = process.env.serverPORT || 4000;
const routes = require('./routes/index');

const reqList = require('./requests/requestList')

const { Connection } = require('./Classes/Connection')
const { WebSocketIO } = require('./services/websocket/socketServer')


const app = express();


app.use(cors());
app.use('/api/', routes);

//Connection.open()
const server = app.listen(port, () => {
    Connection.open()
    WebSocketIO.init(server)


    console.info(`Server started on port ${port}`);
    //let requestLoopGrckiKino = setInterval(reqList.getGrckoKinoR, 60000)
    //let requestLoopSlovak = setInterval(reqList.getSlovakR, 100000)

    let loopGrckoKino = setInterval(async() => {
        let data = await reqList.getGrckoKino()
        console.log(data)
        if (data != null && data != "undefined"){
            console.log(data.ops)
            WebSocketIO.sendData(data.ops)
        }
        //console.log(reqList.getGrckoKino())
    }, 59000)
    let loopSlovakKino = setInterval(async () => {
        let data = await reqList.getSlovakKino()
        console.log(data)
        if (data != null && data !== "undefined"){
            console.log(data.ops)
            WebSocketIO.sendData(data.ops)
        }
        //console.log(reqList.getGrckoKino())
    }, 60000)

    //wsServ.initSocket(server)
    //let testDataLoop = setInterval(() => wsServ.sendData("test"), 5000)
    //let testDataLoop = setInterval(() => WebSocketIO.sendData("test"), 5000)

});