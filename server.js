var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

var departments = require('./server/departments');
var nova = require('./server/nova');
var glance = require('./server/glance');
//require("babel-core/register");

var app = express();

//configure passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// connect to CMPE283 MongoDB
mongoose.connect('mongodb://localhost:27017/CMPE283');
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.get('/departments', departments.findAll);
app.get('/servers', nova.findAllServers);
app.get('/flavors', nova.findAllFlavors);
app.get('/images', glance.findAllImages);

app.use(function(req, res) {
    Router.match({
        routes: routes, location: req.url
    }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            console.log('inside render props' + JSON.stringify(renderProps));
            var html = ReactDOM.renderToString( < RoutingContext {
                ...renderProps
            } />);
            var page = swig.renderFile('views/index.html', {
                html: html
            });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
