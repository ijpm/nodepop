"use strict";

const mensajes = require('./mensajes.json');

module.exports = function(err, req, res, next) {
    // Detectamos el idioma del navegador
    var lenguaje = req.headers["accept-language"] || 'en';

    if (lenguaje) {
        if (lenguaje.indexOf('es') === 0) {
            console.log('Prefiere español')
            lenguaje = 'ES';
        } else {
            console.log('Prefiere ingles')
            lenguaje = 'EN';
        }
    }

    // Obtener el mensaje correcto
    var mensajeError = err.message.toUpperCase();
    const mensajesDeError = mensajes[lenguaje][mensajeError];

    console.log(mensajeError);
    console.log(mensajesDeError);

    err.message = mensajesDeError;
    //next();
    return next(err);
    //return res.json({success:false, error: mensajesDeError});
    //aqui hay que devolver

};