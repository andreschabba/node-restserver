require('./config/config');

const express = require('express'); //LOCAL SERVER
const mongoose = require('mongoose'); //DATABASE
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); //paquete que trae node por defecto, crea el path de manera correcta

//INICIAR CONEXION A BASE DE DATOS
//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// get - obtener informacion
// post - crear nuevos registros
// put - actualizar registros
// delete - cambiar el estado a no disoponible

app.use(express.static(path.resolve(__dirname, '../public')));

// app.use(require('./routes/usuario')); //TO GET ALL THE CODE FROM THAT ROUTE
// app.use(require('./routes/login'));
app.use(require('./routes/index')); //There are all the routes to get all the code

mongoose.connect(process.env.urlDB, (err, res) => { //TO CONNECT THE DB
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => { //CONECT TO THE SERVER
    console.log('Escuchando el puerto: ', process.env.PORT);
});