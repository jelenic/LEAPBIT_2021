const request = require(`request`);

//const { MongoClient } = require("mongodb");
//const uri = "mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/LEAPBITPraksJelenic?retryWrites=true&w=majority";

const { Connection } = require('../../Classes/Connection')


//const mqttServ = require('../websocket/mqtt')


module.exports = {
    parseJSONFromURL: (URL, collectionName) => {
        return new Promise((resolve, reject) => {
            console.log("promise start")
            //const client = new MongoClient(uri, { useUnifiedTopology: true });
            request.get(URL, async (err, response, body) => {
                //console.log("in request get");
                //await client.connect();
                //console.log(err, body, response);
                if (err) {
                    reject(err);
                } else if (response && response.statusCode === 200) {
                    //tu treba parsat, spremit u db i poslat dalje
                    const jsonResponse = JSON.parse(body);
                    let listOfGames = []

                    const content = jsonResponse.content;
                    //const database = client.db('LEAPBITPraksJelenic');
                    //const colName = database.collection(collectionName);

                    const database = Connection.db.db(process.env.dbName);
                    const colName = database.collection(collectionName);
                    
                    let counter = 0

                    for(const entry of content){
                        const exists = await colName.findOne({drawTime: entry.drawTime})
                        if (exists != null){
                            //console.log('entry exists')
                            counter += 1;
                        }
                        else{
                            console.log('added');
                            let jsonObj = {}
                            jsonObj["drawTime"] = entry.drawTime;
                            jsonObj["winningNumbers"] = entry.winningNumbers.list;
                            listOfGames.push(jsonObj)


                            //send to mqtt
                            //mqttServ.sendGrckoKino(JSON.stringify(jsonObj))
                        }
                    }
                    //console.log(listOfGames);
                    if (listOfGames.length >= 1){
                        const result =  await colName.insertMany(listOfGames);
                        console.log("existing" + String(counter))

                        for (const game of listOfGames){
                            global.emit("loto", game)
                        }


                        resolve(result);
                    }
                    else{
                        resolve('nothing inserted');
                    }
                } else {
                    reject(JSON.parse(body));
                }
            })
        })

    },
};