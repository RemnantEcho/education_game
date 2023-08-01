const express = require('express');
const cors = require('cors');
const flags = require('./country-flags.json')
const logger = require("./logger");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);