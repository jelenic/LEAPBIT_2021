const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

class Connection
{
    static async open()
    {
        if (this.db)
        {
            return this.db;
        }
        this.db = await MongoClient.connect(this.uri, this.options);
        // const client = new MongoClient(this.uri, this.options)
        // this.db = await client.connect()
        return this.db;
    }
}

Connection.db = null;
Connection.uri = process.env.dbURI;
Connection.options = {
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = { Connection };
