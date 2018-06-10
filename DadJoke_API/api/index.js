const express = require('express');
const app = express();

const joke = require('./joke');

app.use('/joke', joke);

module.exports = app;