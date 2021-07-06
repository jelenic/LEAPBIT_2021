const JSONparseService = require(`../services/parsers/JSONparser`);
const webparseService = require(`../services/parsers/webparser`);




module.exports = {
   parseJSONFromURL: (req, res) => {
    if (!req.params.date) {
        res.send("Required date is missing");
    }
    else{
        const date = String(req.params.date)
        const dynamicJSONURL = 'https://api.opap.gr/draws/v3.0/1100/draw-date/' + date + '/' + date + '?limit=50&page=0'
        JSONparseService.parseJSONFromURL(dynamicJSONURL, 'test').then((data) => {
            res.send(data);
        }).catch((err) => {
         res.send(err.message);
     });
    }
   },
   parseWebFromURL: (req, res) => {

    const URL = 'https://eklubkeno.etipos.sk/Archive.aspx';
    webparseService.parseWebFromURL(URL, 'test2').then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err.message);
    });
   }
};