"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

// Esquema del usuario
var usuarioSchema = Schema({
    nombre: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    clave: { type: String, required: true }
});

// Antes de guardar, haseamos la clave
usuarioSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('clave')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.clave, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.clave = hash;
            next();
        });
    });
});


usuarioSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.clave, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Creamos el modelo
var Usuario = mongoose.model('Usuario', usuarioSchema);