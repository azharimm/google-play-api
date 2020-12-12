const express = require('express');

const middlewares = require("./utils/middlewares");
const router = require('./routes/router');

const app = express();

app.use('/', router);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;