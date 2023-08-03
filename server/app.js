const cors = require('cors');
const express = require('express');
const app = express();
const port = require('dotenv')
const fs = require('fs');

const messages = require("./messages.json");
const flags = require("./data/country-flags.json");
const capitals = require("./data/capital-cities.json");
const history = require("./data/history-images.json");
const logger = require("./logger");

app.use(logger);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/flags", (req, res) =>  {
    let amount = parseInt(req.query.amount);
    
    if (amount > flags.length) {
        res.send(flags);
    }
    else {
        let shuffledArray = flags
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        res.send(shuffledArray.slice(0, amount));
    }
})

app.get("/capitals", (req, res) =>  {
    let amount = parseInt(req.query.amount);

    if (amount > capitals.length) {
        res.send(capitals);
    }
    else {
        let shuffledArray = capitals
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        res.send(shuffledArray.slice(0, amount));
    }
})

app.get("/history", (req, res) =>  {
    let amount = parseInt(req.query.amount);
    if (amount > history.length) {
        res.send(capitals);
    }
    else {
        let shuffledArray = history
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        res.send(shuffledArray.slice(0, amount));
    }
})

// history page
app.get("/history", (req,res) => {
    res.send(history)
})


// shuffling history images to get 10
app.get("/history/10", (req, res) => {
    const shuffledArr = history.sort(() => Math.random() - 0.5);
    res.send(shuffledArr.slice(0, 10))
})
// shuffling history images to get 20
app.get("/history/20", (req, res) => {
    const shuffledArr = history.sort(() => Math.random() - 0.5);
    res.send(shuffledArr.slice(0, 20))
})

app.get("/messages", (req,res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    const newMessage = req.body
    
    messages.push(newMessage)
    fs.writeFile('tmp/messages.json', JSON.stringify(messages), (error) => {
        if (error) {
            console.log(error)
            res.status(500).send('Failed to add message')
        } else {
            res.status(201).send('Message added')
        }
    })
})
module.exports = app;
