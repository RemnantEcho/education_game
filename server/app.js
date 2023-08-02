const cors = require('cors');
const express = require('express');
const app = express();
const port = require('dotenv')

const flags = require("./country-flags.json")
const logger = require("./logger");
app.use(logger);


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello");
});

// app.get("/flags", (req, res) =>  {
//     res.send(flags)
// })
// generate 10 random flags

app.get("/flags/10", (req, res) => {
    const shuffledArr = flags.sort(() => Math.random() - 0.5);
    res.send(shuffledArr.slice(0, 10))
})

// generate 20 random flags

app.get("/flags/20", (req, res) => {
    const shuffledArr = flags.sort(() => Math.random() - 0.5);
    res.send(shuffledArr.slice(0, 20))
})

app.get("/flags", (req, res) => {
    // const { data } = await
    const shuffledArr = flags.sort(() => Math.random() - 0.5);
    res.send(shuffledArr.slice(0, 20))
})


module.exports = app;
