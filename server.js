var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes');
var mongoose = require('mongoose');

var departments = require('./server/departments');
var nova = require('./server/nova');
var glance = require('./server/glance');
//require("babel-core/register");

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb:localhost/react283');

mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});


app.get('/departments',departments.findAll);
app.get('/servers',nova.findAllServers);
app.get('/flavors',nova.findAllFlavors);
app.get('/images',glance.findAllImages)


app.use(function(req, res) {
    Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            console.log('inside render props'+ JSON.stringify(renderProps))
            var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
            var page = swig.renderFile('views/index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
