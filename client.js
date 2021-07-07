/*const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
 
connection.onopen = () => {
  connection.send('Message From Client') 
}
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}*/

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')


let lastMsg = ''
let lastOrg = ''

client.on('connect', () => {
    client.subscribe('client/grckoKino')
    client.subscribe('client/slovak')

    // Inform controllers that client is connected
    client.publish('client/connected', 'true')
    sendLastMessage()
})

client.on('message', (topic, message) => {
    console.log('received message %s %s', topic, message)
    switch (topic) {
        case 'client/grckoKino':
          return handleGrckoKino(message)
        case 'client/slovak':
          return handleSlovak(message)
      }
})

function sendLastMessage () {
    console.log('sending lastMsg %s', lastMsg)
    client.publish('client/lastMsg', lastMsg)
}

function sendLastOrigin (origin){
    if (typeof(origin)==='string'){
        client.publish('client/lastOrg',origin)
        lastOrg = origin
    }
    else{
        console.log("origin must be string")
    }
}

function handleGrckoKino (message) {
    console.log("GrckoKino")
    console.log(message)
    sendLastMessage()
    sendLastOrigin('GrckoKino')
}

function handleSlovak (message) {
    console.log("Slovak")
    console.log(message)
    sendLastMessage()
    sendLastOrigin('Slovak')
}

function handleClientExit (options, err) {
    if (err) {
        console.log('err')
        console.log(err.stack)
    }
  
    if (options.cleanup) {
        client.publish('client/connected', 'false')
    }
  
    if (options.exit) {
        process.exit()
    }
  }

process.on('exit', handleClientExit.bind(null, {cleanup: true}))
process.on('SIGINT', handleClientExit.bind(null, {exit: true}))
process.on('uncaughtException', handleClientExit.bind(null, {exit: true}))