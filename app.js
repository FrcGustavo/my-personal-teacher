const express = require('express');
const request = require('request');

const config = require('./config');

const app = express();
const access_token = config.accessToken;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello there, this bot is your personal teacher');
});

app.get('/webhook', (req, res) => {
    if(req.query['hub.verify_token'] === config.verifyToken){
        res.send(req.query['hub.challenge']);
    } else {
        res.send('My personal teacher no tienes permisos.');
    }
});

app.post('/webhook', (req, res) => {
    const webhook_event = req.body.entry[0];

    if(webhook_event.messaging) {
        webhook_event.messaging.forEach(event => {
            handleMessage(event);
        })
    }
    
    res.sendStatus(200);
});


function handleMessage(event){
    const senderId = event.sender.id;
    const messageText = event.message.text;
    const messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: messageText
        }
    }
    callSendApi(messageData);
}

function callSendApi(response) {
    request({
        "uri": "https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": access_token
        },
        "method": "POST",
        "json": response
        },
        function(err) {
            if(err) {
                console.log('Ha ocurrido un error')
            } else {
                console.log('Mensaje enviado')
            }
        }
    );
};

app.listen(5000, () => {
    console.log('server is running in port: 5000');
});