const request = require(`request`);
//const { MongoClient } = require("mongodb");
//const uri = "mongodb+srv://readWrite:rKsnW2pPLafbHHz@nodeloraapp.rguzt.mongodb.net/LEAPBITPraksJelenic?retryWrites=true&w=majority";


const querySelectorAll = require('query-selector');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;;


const { Connection } = require('../../Classes/Connection')


const mqttServ = require('../websocket/mqtt')

module.exports = {
    parseWebFromURL: (URL, collectionName) => {
        return new Promise((resolve, reject) => {
            console.log("promise start")
            //const client = new MongoClient(uri, { useUnifiedTopology: true });
            const date = getDate();
            console.log(date)
            request.get(URL, async (err, response, body) => {
                //await client.connect();
                if (err) {
                    reject(err);
                } else if (response && response.statusCode === 200) {
                    //tu treba parsat, spremit u db i poslat dalje
                    const raw = body;
                    const dom = new JSDOM(raw);
                    const queryResult1 = dom.window.document.querySelectorAll("div.container")

                    const dom2 = new JSDOM(queryResult1[2].innerHTML)
                    const queryResult2 = dom2.window.document.querySelectorAll("div.closest")
                    const queryResult3 = dom2.window.document.querySelectorAll("div.numbers")

                    let list = []
                    for (let i=0; i<queryResult2.length; i++){
                        let jsonObj = {}
                        const dom3 = new JSDOM(queryResult2[i].innerHTML)
                        const dom4 = new JSDOM(queryResult3[i].innerHTML)
                        jsonObj["drawTime"] = Date.parse(date + dom3.window.document.querySelectorAll("span")[1].innerHTML + ':00 GMT');
                        let listOfNums = []
                        
                        const queryResult4 = dom4.window.document.querySelectorAll("span");
                        for(let j=0; j<queryResult4.length; j++){
                            listOfNums.push(queryResult4[j].innerHTML)
                        }
                        jsonObj["winningNumbers"] = listOfNums

                        list.push(jsonObj)
                    }


                    //const database = client.db('LEAPBITPraksJelenic');
                    //const colName = database.collection(collectionName);

                    const database = Connection.db.db(process.env.dbName);
                    const colName = database.collection(collectionName)

                    let listOfGames = []
                    //console.log(list)
                    
                    for(const entry of list){
                        //console.log(entry)
                        const exists = await colName.findOne({drawTime: entry.drawTime})
                        if (exists != null){
                            console.log('entry exists')
                        }
                        else{
                            console.log('added');
                            let jsonObj = {}
                            jsonObj["drawTime"] = entry.drawTime;
                            jsonObj["winningNumbers"] = entry.winningNumbers;
                            listOfGames.push(jsonObj)

                            //send to mqtt
                            mqttServ.sendSlovak(JSON.stringify(jsonObj))
                        }
                    }
                    //console.log(listOfGames);
                    if (listOfGames.length >= 1){
                        const result =  await colName.insertMany(listOfGames);
                        resolve(result);
                    }
                    else{
                        resolve('nothing inserted');
                    }

                    

                    resolve(list);
                } else {
                    reject(body);
                }
            })
        })

    },
};



function getDate(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let mmS = monthNames[today.getMonth()]
    let yyyy = today.getFullYear();

    today = dd + ' ' + mmS + ' ' + yyyy + ' ';
    return today;
}