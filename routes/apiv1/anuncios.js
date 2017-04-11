"use strict";

// Cargamos express y el router
const express = require('express');
const router = express.Router();

// Cargamos mongoose y el modelo de anuncio
const mongoose = require('mongoose');
const anuncio = mongoose.model('Anuncio');

//autenticacion con jwt
const jwtAuth = require('../../lib/jwtAuth');

// GET - Devolvemos la lista de tags
router.get('/tags', function (req, res) {

    const query = anuncio.find();
    query.select('tags');

    query.exec(function(err, rows) {
        if (err) {
            err = new Error('INTERNAL SERVER ERROR');
            err.status = 500;
            return next(err);
        }

        const tags = [];
        rows.forEach((row) => {
            row.tags.forEach(function(tag) {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
        res.status(200).json({success: true, result: tags});
    });
});


// GET - Devolvemos la lista de anuncios con filtros
router.get('/',jwtAuth ,function(req, res, next) {

    // Aqui hay informacion del id del usuarios
    //console.log('usuario_id', req.user_id);

    const tags = req.query.tag || '';
    const venta = req.query.venta || null;
    const nombre = req.query.nombre || '';
    const precio = req.query.precio || '';
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    const filter = {};

    // Construimos la query de la tag
    if (tags) filter.tags = { $in: tags.split(',') };

    // Construimos el filtro de venta
    if (venta !== null) {
        if (venta === 'true') filter.venta = true;
        if (venta === 'false') filter.venta = false;
    }

    // Filtro de nombre
    if (nombre) filter.nombre = new RegExp(`^${nombre}`, 'i');

    // filtro de precios
    const queryPrecios = precio.split('-');
    if (queryPrecios.length === 1) {
        if (queryPrecios[0] !== '') { filter.precio = queryPrecios[0]; }
    } else {
        filter.precio = {};
        if (queryPrecios[0] !== '') { filter.precio.$gte = queryPrecios[0]; }
        if (queryPrecios[1] !== '') { filter.precio.$lte = queryPrecios[1]; }
    }

    // Filtro de sort
    const sort = req.query.sort;

    //console.log(filter);

    anuncio.list(filter, limit, skip, sort, function (err, rows) {
        if (err){
            err = new Error('INTERNAL SERVER ERROR');
            err.status = 500;
            return next(err);
        }
        res.json({success: true, result: rows});
    });
});



module.exports = router;