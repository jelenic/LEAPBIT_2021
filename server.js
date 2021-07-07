const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();



const port = process.env.serverPORT || 4000;
const routes = require('./routes/index');

const reqList = require('./requests/requestList')

const { Connection } = require('./Classes/Connection')


const app = express();


app.use(cors());
app.use('/api/', routes);

//Connection.open()
app.listen(port, () => {
    Connection.open()
    console.info(`Server started on port ${port}`);
    //let requestLoopGrckiKino = setInterval(reqList.getGrckoKino,60000)
    //let requestLoopSlovak = setInterval(reqList.getSlovak,100000)
});