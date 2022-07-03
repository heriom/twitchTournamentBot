require('dotenv').config();

const tmi = require('tmi.js');
const mongoose = require('mongoose');
const db = mongoose.connection;

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.TWITCHNAME,
        password: process.env.OAUTH,
    },
    channels: ['heriom']
}

mongoose.connect(process.env.MONGODBCONNECT, { useUnifiedTopology: true, useNewUrlParser: true}).then(console.log("Connected to mongodb"));

const client = new tmi.client(options);

client.connect();

// log when client is connected to twitch
client.on('connected', () => {
    client.say(options.channels[0], 'Connected');
});