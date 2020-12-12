const express = require('express');
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, function () {
  console.log('Server running on port', port);
});