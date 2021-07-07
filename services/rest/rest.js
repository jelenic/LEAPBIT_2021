//const { MongoClient } = require("mongodb");
//const uri = "mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/LEAPBITPraksJelenic?retryWrites=true&w=majority";


const { Connection } = require('../../Classes/Connection')

module.exports = {
    getKinos: () => {

    },
    getSingleKinoData: (name) => {
        return new Promise(async (resolve, reject) => {
            //const client = new MongoClient(uri, { useUnifiedTopology: true });
            //await client.connect();

            const database = Connection.db.db('LEAPBITPraksJelenic');
            const colName = database.collection(name);
            const result = await colName.find({}).toArray(function(error, documents) {
                //console.log(documents)
                if (documents != null){
                    resolve(documents)
                }
            });
        })
    },
    getSingleKinoDataQ: (name, minms) => {
        return new Promise(async (resolve, reject) => {
            const database = Connection.db.db('LEAPBITPraksJelenic');
            const colName = database.collection(name);
            console.log(minms)
            const result = await colName.find({drawTime: {$gt: minms}}).toArray(function(error, documents) {
                //console.log(documents)
                if (documents != null){
                    resolve(documents)
                }
            });
        })
    },
    getSingleDrawData: (name, ms) => {
        return new Promise(async (resolve, reject) => {
            const database = Connection.db.db('LEAPBITPraksJelenic');
            const colName = database.collection(name);
            const result = await colName.findOne({drawTime: ms})
            if (result != null){
                resolve(result)
            }
            else{
                resolve("no draw with that ms")
            }
        })
    },
    getSingleKinoDataAsync: (name, minms) => {
        
    }
}