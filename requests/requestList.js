require('http');
const request = require('request');

const JSONparseService = require('../services/parsers/JSONparser');
const webparseService = require('../services/parsers/webparser');

function getDate()
{
    // const monthNames = ['January', 'February', 'March', 'April',
    // 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    // const mmS = monthNames[today.getMonth()];
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    return today;
}

function getGrckoKinoR()
{
    const date = getDate();
    request({
        url: `http://localhost:4000/api/parse/json/${date}`,
        method: 'GET',
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 5,
    }, (error, response) =>
    {
        if (!error && response.statusCode === 200)
        {
            console.log('sucess!');
        }
        else
        {
            console.log(`error${response.statusCode}`);
        }
    });
}

function getSlovakR()
{
    request({
        url: 'http://localhost:4000/api/parse/web',
        method: 'GET',
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 5,
    }, (error, response) =>
    {
        if (!error && response.statusCode === 200)
        {
            console.log('sucess!');
        }
        else
        {
            console.log(`error ${response.statusCode}`);
        }
    });
}

/* async function getGrckoKino()
{
    const date = getDate();
    const dynamicJSONURL = `https://api.opap.gr/draws/v3.0/1100/draw-date/${date}/${date}?limit=50&page=0`;
    try
    {
        const data = await JSONparseService.parseJSONFromURL(dynamicJSONURL, process.env.GKC);
        return data;
    }
 catch (error)
    {
        throw (error);
    }
    /* JSONparseService.parseJSONFromURL(dynamicJSONURL, process.env.GKC).then((data) => {
        console.log("Grcko kino parsed")
        //emit event here
        //console.log(data)
        return (data)
    }).catch((err) => {
        //res.send(err.message);
        return (err)
    }); *
} */

/* async function getSlovakKino()
{
    const URL = process.env.slovakKinoURL;
    try
    {
        const data = await webparseService.parseWebFromURL(URL, process.env.SKC);
        return data;
    }
 catch (error)
    {
        throw (error);
    }
    /* webparseService.parseWebFromURL(URL, process.env.GKC).then((data) => {
        console.log("Slovak kino parsed")
        //console.log(data)
        return (data)
    }).catch((err) => {
        return (err);
    }); *
} */

async function getGrckoKinoAsync()
{
    const date = getDate();
    const dynamicJSONURL = `https://api.opap.gr/draws/v3.0/1100/draw-date/${date}/${date}?limit=50&page=0`;
    const data = await JSONparseService.parseJSONFromURLAsync(dynamicJSONURL, process.env.GKC);
    return data;
    /* try
    {
        const data = await JSONparseService.parseJSONFromURLAsync(dynamicJSONURL, process.env.GKC);
        return data;
    }
 catch (error)
    {
        throw (error);
    } */
}

async function getSlovakKinoAsync()
{
    const URL = process.env.slovakKinoURL;
    const data = await webparseService.parseWebFromURLAsync(URL, process.env.SKC);
    return data;
    /* try
    {
        const data = await webparseService.parseWebFromURLAsync(URL, process.env.SKC);
        return data;
    }
 catch (error)
    {
        throw (error);
    } */
}

module.exports = {
    getGrckoKinoR,
    getSlovakR,
    // getGrckoKino,
    // getSlovakKino,
    getGrckoKinoAsync,
    getSlovakKinoAsync,
};
