const { Connection } = require('../../Classes/Connection');

module.exports = {
    getKinos: () =>
    {

    },
    /* getSingleKinoDataP: (name) => new Promise(async (resolve) =>
    {
        // const client = new MongoClient(uri, { useUnifiedTopology: true });
        // await client.connect();

        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        await colName.find({}).toArray((error, documents) =>
        {
            // console.log(documents)
            if (documents != null)
            {
                resolve(documents);
            }
        });
    }), */
    getSingleKinoData: async (name) =>
    {
        // const client = new MongoClient(uri, { useUnifiedTopology: true });
        // await client.connect();

        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        const data = await colName.find({}).toArray();
        return data;
    },
    /* getSingleKinoDataQP: (name, minms) => new Promise(async (resolve) =>
    {
        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        console.log(minms);
        await colName.find({ drawTime: { $gt: minms } }).toArray((error, documents) =>
        {
            // console.log(documents)
            if (documents != null)
            {
                resolve(documents);
            }
        });
    }), */
    getSingleKinoDataQ: async (name, minms) =>
    {
        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        console.log(minms);
        const data = await colName.find({ drawTime: { $gt: minms } }).toArray();
        return data;
    },
    /* getSingleDrawDataP: (name, ms) => new Promise(async (resolve) =>
    {
        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        const result = await colName.findOne({ drawTime: ms });
        if (result != null)
        {
            resolve(result);
        }
        else
        {
            resolve('no draw with that ms');
        }
    }), */
    getSingleDrawData: async (name, ms) =>
    {
        const database = Connection.db.db(process.env.dbName);
        const colName = database.collection(name);
        const data = await colName.findOne({ drawTime: ms });
        if (data != null)
        {
            return (data);
        }
        return ('no draw with ms');
    },
    /* getSingleKinoDataAsync: (name, minms) =>
    {

    }, */
};
