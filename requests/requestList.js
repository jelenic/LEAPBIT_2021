var http = require('http');
var request = require('request');


function getGrckoKino(){
    date = getDate()
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

  function getSlovak(){
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
    getGrckoKino, getSlovak
}