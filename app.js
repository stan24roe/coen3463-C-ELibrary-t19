var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdburl = "mongodb://food:recipe@ds111589.mlab.com:11589/coen3463t18"
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

    app.get('/foods', function(req, res) {
        var foodsCollection = db.collection('foods');
        foodsCollection.find().toArray(function(err, foods) {
           console.log('foods loaded', foods);
          res.render('foods', {
            foods: foods
          });
        })

    });

    app.post('/foods', function(req, res) {
        console.log(req.body);
        var dataToSave = {
            name: req.body.name,
            Ingredients: req.body.Ingredients,
            Description: req.body.Description,
        };
        db.collection('foods')
          .save(dataToSave, function(err, food) {
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successfull!");
            res.redirect('/foods');
        })
    });

    app.get('/food/:foodId', function(req, res) {
        var foodId = req.params.foodId;
        var foodCollection = db.collection('foods');
        foodCollection.findOne({ _id: new ObjectId(foodId) }, function(err, food) {
            res.render('food', {
                food: food
            });
        });
    });

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
