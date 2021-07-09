const request = require(`request`);

const { Connection } = require('../../Classes/Connection')



module.exports = {
    parseJSONFromURL: (URL, collectionName) => {
        try {
            return new Promise((resolve, reject) => {
                console.log("promise start")
                request.get(URL, async (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else if (response && response.statusCode === 200) {
                        //tu treba parsat, spremit u db i poslat dalje
                        const jsonResponse = JSON.parse(body);
                        let listOfGames = []
    
                        const content = jsonResponse.content;
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
                                jsonObj["type"] = "GrckoKino"
                                listOfGames.push(jsonObj)
    
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
        } catch (error) {
            console.log(error)
        }

    },
    parseJSONFromURLAsync: async (URL, collectionName) => {
        console.log("async start")
        request.get(URL, async (err, response, body) => {
            if (err) {
                return(err);
            } else if (response && response.statusCode === 200) {
                //tu treba parsat, spremit u db i poslat dalje
                const jsonResponse = JSON.parse(body);
                let listOfGames = []

                const content = jsonResponse.content;
                const database = Connection.db.db(process.env.dbName);
                const colName = database.collection(collectionName);
                let counter = 0

                for(const entry of content){
                    const exists = await colName.findOne({drawTime: entry.drawTime})
                    if (exists != null){
                        counter += 1;
                    }
                    else{
                        console.log('added');
                        let jsonObj = {}
                        jsonObj["drawTime"] = entry.drawTime;
                        jsonObj["winningNumbers"] = entry.winningNumbers.list;
                        jsonObj["type"] = "GrckoKino"
                        listOfGames.push(jsonObj)

                    }
                }
                if (listOfGames.length >= 1){
                    const result =  await colName.insertMany(listOfGames);
                    console.log("existing" + String(counter))

                    for (const game of listOfGames){
                        global.emit("loto", game)
                    }


                    return(result);
                }
                else{
                    return('nothing inserted');
                }
            } else {
                return(JSON.parse(body));
            }
        })

    }
};