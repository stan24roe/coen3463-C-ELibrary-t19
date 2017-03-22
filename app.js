var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/users');
var forums = require('./routes/forums');
var relays = require('./routes/relays');
var resistors = require('./routes/resistors');
var transistors = require('./routes/transistors');
var diodes= require('./routes/diodes');
var others = require('./routes/others');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdburl = 'mongodb://Rosales:stan24roe@ds161028.mlab.com:61028/coen3464t19';
MongoClient.connect(mdburl, function(err, database) {
    if (err) {
        console.log(err)
        return;
    }
    console.log("Connected to DB!");

    // set database
    db = database;

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', index);
    app.use('/forums', index);
    app.use('/relays', relays);
    app.use('/resistors', resistors);
    app.use('/diodes', diodes);
    app.use('/transistors', transistors);
    app.use('/others', others);
    

  
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
});
module.exports = app;
