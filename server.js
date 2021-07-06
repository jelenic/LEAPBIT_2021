const express = require('express');
const cors = require('cors')


const port = 4000;
const routes = require('./routes/index');


const app = express();


app.use(cors());
app.use('/api/', routes);


app.listen(port, () => {
    console.info(`Server started on port ${port}`);
});