//Here put al the routes to just export
//one in server.js 


const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./category'));
app.use(require('./product'));

//Is important never forget this part
module.exports = app;