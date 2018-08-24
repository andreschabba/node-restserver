require('./config/config');

const express = require('express'); //LOCAL SERVER
const mongoose = require('mongoose'); //DATABASE
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// get - obtener informacion
// post - crear nuevos registros
// put - actualizar registros
// delete - cambiar el estado a no disoponible

app.use(require('./routes/usuario')); //TO GET ALL THE CODE FROM THAT ROUTE

mongoose.connect(process.env.urlDB, (err, res) => { //TO CONNECT THE DB
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => { //CONECT TO THE SERVER
    console.log('Escuchando el puerto: ', process.env.PORT);
});