const mqtt = require('mqtt');

/* let msg = ''
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
    if (connected) {
      client.publish('client/grckoKino', msg)
    }
  }

  function sendSlovak (msg) {
    if (connected) {
      client.publish('client/slovak', msg)
    }
  }

module.exports = {
    sendGrckoKino, sendSlovak
} */

class MQTT
{
    static init()
    {
        if (this.client)
        {
            return this.client;
        }
        this.client = mqtt.connect('mqtt://broker.hivemq.com');
        this.client.on('connect', () =>
        {
            this.client.subscribe('client/connected');
            this.client.subscribe('client/lastMsg');

            global.on('loto', (data) =>
            {
                this.sendData(JSON.stringify(data));
            });
        });

        this.client.on('message', (topic, message) =>
        {
            switch (topic)
            {
            default:
                console.log('No handler for topic %s', topic);
                return (0);
            case 'client/connected':
                return this.handleClientConnected(message);
            case 'client/lastMsg':
                return this.handleClientLastMsg(message);
            case 'client/lastOrg':
                return this.handleLastOrg(message);
            }
        });

        return this.client;
    }

    static handleClientConnected(message)
    {
        console.log('client connected status %s', message);
        this.connected = (message.toString() === 'true');
    }

    static handleClientLastMsg(message)
    {
        this.msg = message;
        console.log('client lastMsgReceived: %s', message);
    }

    static handleLastOrg(message)
    {
        this.org = message;
        console.log('client lastOrgReceived: %s', message);
    }

    static sendData(data)
    {
        if (this.connected)
        {
            if (data.type === 'GrckoKino')
            {
                this.client.publish('client/grckoKino', data);
            }
            else
            {
                this.client.publish('client/slovak', data);
            }
        }
    }
}
MQTT.msg = '';
MQTT.org = '';
MQTT.connected = false;
MQTT.client = null;

module.exports = { MQTT };
