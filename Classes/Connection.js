const { MongoClient } = require("mongodb");

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.uri, this.options);
        //const client = new MongoClient(this.uri, this.options)
        //this.db = await client.connect()
        return this.db
    }

}

Connection.db = null
Connection.uri = "mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/LEAPBITPraksJelenic?retryWrites=true&w=majority"
Connection.options = {
    bufferMaxEntries:   0,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }