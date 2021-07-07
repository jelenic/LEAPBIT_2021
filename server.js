const express = require('express');
const cors = require('cors')



const port = 4000;
const routes = require('./routes/index');

const reqList = require('./requests/requestList')


const app = express();


app.use(cors());
app.use('/api/', routes);


app.listen(port, () => {
    console.info(`Server started on port ${port}`);
    //let requestLoopGrckiKino = setInterval(reqList.getGrckoKino,60000)
    //let requestLoopSlovak = setInterval(reqList.getSlovak,100000)
});