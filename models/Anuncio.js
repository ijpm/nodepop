"use strict";

const mongoose = require('mongoose');

// Definimos el Esquema del anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Creamos un metodo estatico par listar los articulos con filtros
anuncioSchema.statics.list = function (filter, limit, skip, sort,  cb) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.exec(cb);
};

// Metodo de devolución de tags
anuncioSchema.statics.listTags = function () {
    const lista = this.find().distinct('tags', function (error, ids) {
        //console.log(ids);
        return ids;
    });

};


// Creamos el modelo
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;