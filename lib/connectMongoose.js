"use strict";

const mongoose = require('mongoose');
//Creamos el objeto de conexion
const conn = mongoose.connection;

// Le decimos a mongoose que libreria de promesas va a usar
mongoose.Promise = global.Promise;

// Suscribirnos a posibles errores de conexión
conn.on('error', function (err) {
    console.log('Error de conexion: ', err);
    process.exit(1);
});

conn.once('open', function () {
    console.log('Conectado a MongoDb');
});

//Realizamos la conexión
mongoose.connect('mongodb://localhost:27017/nodepop');