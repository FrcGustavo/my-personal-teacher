const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello there, this bot is your personal teacher');
});

app.get('/webhook', (req, res) => {
    if(req.query['hub.verify_token'] === 'my_personal_teacher_token'){
        res.send(req.query['hub.challenge']);
    } else {
        res.send('My personal teacher no tienes permisos.');
    }
});

app.post('/webhook', (req, res) => {
    const webhook_event = req.body.entry[0];

    if(webhook_event.messaging) {
        webhook_event.messaging.forEach(event => {
            console.log(event);
        })
    }
    
    res.sendStatus(200);
})


app.listen(5000, () => {
    console.log('server is running in port: 5000');
});