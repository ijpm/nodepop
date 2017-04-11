"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// Middleware de autenticacion
module.exports = function (req, res, next) {
    //recogemos el token
    const token = req.body.token ||
        req.query.token ||
        req.get('x-access-token');

    if (!token) {
        const err = new Error('NO TOKEN PROVIDED');
        err.status = 401; //TODO: Hacer esto en todos los errores y ver como internacionalizarlo
        return next(err);
    }

    jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
        if (err) {
            return next(new Error('INVALID TOKEN'));
        }
        //console.log(decoded);
        req.user_id = decoded.user_id;
        next();

    });



};