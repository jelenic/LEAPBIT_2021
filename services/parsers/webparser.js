const request = require('request');

require('query-selector');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { Connection } = require('../../Classes/Connection');

// const mqttServ = require('../websocket/mqtt')
function getDate()
{
    const monthNames = ['January', 'February', 'March',
        'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const mmS = monthNames[today.getMonth()];
    const yyyy = today.getFullYear();

    today = `${dd} ${mmS} ${yyyy} `;
    return today;
}

module.exports = {
    /* parseWebFromURL: (URL, collectionName) => {
        try {
            return new Promise((resolve, reject) => {
                console.log("promise start")
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
                            jsonObj["drawTime"] = Date
                            .parse(date + dom3.window.document.querySelectorAll("span")[1].innerHTML + ':00 GMT');
                            let listOfNums = []

                            const queryResult4 = dom4.window.document.querySelectorAll("span");
                            for(let j=0; j<queryResult4.length; j++){
                                listOfNums.push(queryResult4[j].innerHTML)
                            }
                            jsonObj["winningNumbers"] = listOfNums

                            list.push(jsonObj)
                        }

                        const database = Connection.db.db(process.env.dbName);
                        const colName = database.collection(collectionName)
                        let listOfGames = []
                        let counter = 0

                        for(const entry of list){
                            //console.log(entry)
                            const exists = await colName.findOne({drawTime: entry.drawTime})
                            if (exists != null){
                                //console.log('entry exists')
                                counter += 1
                            }
                            else{
                                console.log('added');
                                let jsonObj = {}
                                jsonObj["drawTime"] = entry.drawTime;
                                jsonObj["winningNumbers"] = entry.winningNumbers;
                                jsonObj["type"] = "SlovakKino"
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

                        resolve(list);
                    } else {
                        reject(body);
                    }
                })
            })
        } catch (error) {
            throw(error)
        }

    }, */
    parseWebFromURLAsync: async (URL, collectionName) =>
    {
        console.log('asyncSlovak start');
        const date = getDate();
        console.log(date);
        request.get(URL, async (err, response, body) =>
        {
            if (err)
            {
                throw (err);
            }
            else if (response && response.statusCode === 200)
            {
                // tu treba parsat, spremit u db i poslat dalje
                const raw = body;
                const dom = new JSDOM(raw);
                const queryResult1 = dom.window.document.querySelectorAll('div.container');

                const dom2 = new JSDOM(queryResult1[2].innerHTML);
                const queryResult2 = dom2.window.document.querySelectorAll('div.closest');
                const queryResult3 = dom2.window.document.querySelectorAll('div.numbers');

                const list = [];
                for (let i = 0; i < queryResult2.length; i += 1)
                {
                    const jsonObj = {};
                    const dom3 = new JSDOM(queryResult2[i].innerHTML);
                    const dom4 = new JSDOM(queryResult3[i].innerHTML);
                    jsonObj.drawTime = Date
                        .parse(`${date + dom3.window.document.querySelectorAll('span')[1].innerHTML}:00 GMT`);
                    const listOfNums = [];

                    const queryResult4 = dom4.window.document.querySelectorAll('span');
                    for (let j = 0; j < queryResult4.length; j += 1)
                    {
                        listOfNums.push(queryResult4[j].innerHTML);
                    }
                    jsonObj.winningNumbers = listOfNums;

                    list.push(jsonObj);
                }

                const database = Connection.db.db(process.env.dbName);
                const colName = database.collection(collectionName);
                const listOfGames = [];
                let counter = 0;

                const promises = [];
                for (const entry of list)
                {
                    let someNumber = counter;
                    promises.push((async () =>
                    {
                        const exists = await colName.findOne({ drawTime: entry.drawTime });
                        if (exists != null)
                        {
                            // console.log('entry exists')
                            someNumber += 1;
                        }
                        else
                        {
                            console.log('added');
                            const jsonObj = {};
                            jsonObj.drawTime = entry.drawTime;
                            jsonObj.winningNumbers = entry.winningNumbers;
                            jsonObj.type = 'SlovakKino';
                            listOfGames.push(jsonObj);
                        }
                    })());
                    console.log(someNumber);
                    counter = someNumber;
                }

                /* for (const entry of list)
                {
                    // console.log(entry)
                    const exists = await colName.findOne({ drawTime: entry.drawTime });
                    if (exists != null)
                    {
                        // console.log('entry exists')
                        counter += 1;
                    }
                    else
                    {
                        console.log('added');
                        const jsonObj = {};
                        jsonObj.drawTime = entry.drawTime;
                        jsonObj.winningNumbers = entry.winningNumbers;
                        jsonObj.type = 'SlovakKino';
                        listOfGames.push(jsonObj);
                    }
                } */
                // console.log(listOfGames);
                await Promise.all(promises);
                console.log(`existing${String(counter)}`);
                if (listOfGames.length >= 1)
                {
                    const result = await colName.insertMany(listOfGames);
                    counter = 0;
                    for (const game of listOfGames)
                    {
                        global.emit('loto', game);
                    }
                    return (result);
                }

                return ('nothing inserted');
            }
            else
            {
                return (body);
            }
        });
    },
};
