let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://broker.hivemq.com')

let msg = ''
let org = ''
let connected = false

client.on('connect', () => {
  client.subscribe('client/connected')
  client.subscribe('client/lastMsg')

  global.on("loto", (data) => {
    sendGrckoKino(JSON.stringify(data))
  })
})

client.on('message', (topic, message) => {
    switch (topic) {
        case 'client/connected':
            return handleClientConnected(message)
        case 'client/lastMsg':
            return handleClientLastMsg(message)
        case 'client/lastOrg':
            return handleLastOrg(message)
      }
      console.log('No handler for topic %s', topic)
})

function handleClientConnected (message) {
    console.log('client connected status %s', message)
    connected = (message.toString() === 'true')
  }
  
function handleClientLastMsg (message) {
    msg = message
    console.log('client lastMsgReceived: %s', message)
  }

function handleLastOrg (message) {
    org = message
    console.log('client lastOrgReceived: %s', message)
  }



  function sendGrckoKino (msg) {
    // can only open door if we're connected to mqtt and door isn't already open
    if (connected) {
      // Ask the door to open
      client.publish('client/grckoKino', msg)
    }
  }

  function sendSlovak (msg) {
    // can only open door if we're connected to mqtt and door isn't already open
    if (connected) {
      // Ask the door to open
      client.publish('client/slovak', msg)
    }
  }

module.exports = {
    sendGrckoKino, sendSlovak
}