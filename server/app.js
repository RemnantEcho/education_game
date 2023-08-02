const cors = require('cors');
const express = require('express');
const app = express();

const flags = require("./country-flags.json")
const logger = require("./logger");
app.use(logger);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/flags", (req, res) =>  {
    res.send(flags)
})

module.exports = app;
