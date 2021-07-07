let http = require('http');
let request = require('request');

let JSONparseService = require('../services/parsers/JSONparser')
let webparseService = require('../services/parsers/webparser')


function getGrckoKinoR(){
    let date = getDate()
    request({
        url: "http://localhost:4000/api/parse/json/" + date,
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 5
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log('sucess!');
        }else{
            console.log('error' + response.statusCode);
        }
    });
  }

  function getSlovakR(){
    request({
        url: "http://localhost:4000/api/parse/web",
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 5
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log('sucess!');
        }else{
            console.log('error' + response.statusCode);
        }
    });
  }

  function getGrckoKino(){
    let date = getDate()
    const dynamicJSONURL = 'https://api.opap.gr/draws/v3.0/1100/draw-date/' + date + '/' + date + '?limit=50&page=0'
    JSONparseService.parseJSONFromURL(dynamicJSONURL, process.env.GKC).then((data) => {
        console.log("Grcko kino parsed")
        //emit event here
        console.log(data)
    }).catch((err) => {
        res.send(err.message);
    });
  }

  function getSlovakKino(){
    const URL = process.env.slovakKinoURL;
    webparseService.parseWebFromURL(URL, process.env.GKC).then((data) => {
        console.log("Slovak kino parsed")
        //emit event here
        console.log(data)
    }).catch((err) => {
        res.send(err.message);
    });
  }

function getDate(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let mmS = monthNames[today.getMonth()]
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;
    return today;
}

module.exports = {
    getGrckoKinoR, getSlovakR, getGrckoKino, getSlovakKino
}