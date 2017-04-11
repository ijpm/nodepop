"use strict";

// Cargamos express y el router
const express = require('express');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');


const router = express.Router();


// Cargamos mongoose y el modelo de anuncio
const mongoose = require('mongoose');
const usuario = mongoose.model('Usuario');



// POST - Autenticacion de usuarios (login)
router.post('/authenticate', function (req, res, next) {

    // recogemos las crendenciales del usuario
    const email = req.body.email;
    const clave = req.body.clave;

    // buscamos en la base de datos
    usuario.findOne({email: email}).exec(function (err, user) {
        if (err){
            return next(err); // Aquí hay que manejar el error.
        }
        if (!user) {
            // Si no se encuentra el usuario
            res.json({success: false, error: 'Usuario no encontrado'});
        }

        // Si encontramos al usuario comprobamos su password
        user.comparePassword(clave, function (err, isMatch) {
            if (err) return next(err);
            console.log(clave);
            if (!isMatch) {
                return res.json({success: false, error: 'Clave incorrecta'});
            }
            jwt.sign({user_id: user._id}, localConfig.jwt.secret,{
                expiresIn: localConfig.jwt.expiresIn
            }, function (err, token) {
                // respondemos al usuario dandole el token
                res.json({success: true, token: token});
            });

        });

    });

});


// POST - Cargamos un usuario (registrar)
router.post('/', function (req, res, next) {
    console.log('Registro de usuario');
    const u = new usuario(req.body);
    console.log(req.body);
    // Ya tenemos al usuario
    usuario.findOne({email: u.email}, function (err, user) {
        if (err) {
            return res.json({success: false, error: 'Error en la base de datos'});

        }
        if (user) {
            return res.json({success: false, error: 'Usuario ya existe'});
        } else {
            //  si no hay usuario significa que no existe
            console.log('No existe');


            u.save(function (err, usuarioGuardado) {
                res.json({succes: true, result: usuarioGuardado});
            });
        }
    });
});


module.exports = router;