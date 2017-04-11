var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

const customError = require('./lib/customError');

// Middlewares
require('./lib/connectMongoose'); // Conexión con Mongoose
require('./models/Anuncio'); // Modelo de anuncios
require('./models/Usuario'); // Modelo de usuarios

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',      require('./routes/index'));
app.use('/apiv1/anuncios',      require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( customError, function(err, req, res, next) {
    res.status(err.status || 500);
    if (isAPI(req)) { // llamada de AIP, devuelvo JSON
        // llamamos a la función que modifica el mensaje
        return res.json({success:false, error: err.message});
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

// funcion rapida que detecta si es una peticion del api
function isAPI(req) {
    //TODO: Esto puede ser muy util a la hora de detectar la URL el lenguaje
    return req.originalUrl.indexOf('/apiv1') === 0; // Si esta en la posicion 0 es que esta o falso si no esta.
}

module.exports = app;
