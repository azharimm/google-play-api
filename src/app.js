const express = require('express');

const middlewares = require("./utils/middlewares");
const router = require('./routes/router');

const app = express();
//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://azharimm.tk');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/', router);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;