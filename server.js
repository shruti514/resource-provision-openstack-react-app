var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var session = require('cookie-session');
var routes = require('./app/routes');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var departments = require('./server/departments');
var nova = require('./server/nova');
var glance = require('./server/glance');
var User = require('./models/user');
var users = require('./server/users');
//require("babel-core/register");

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets',express.static(path.join(__dirname, '/assets')));

mongoose.connect('mongodb://localhost/CMPE283',function(err){
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

// Configure passport middleware
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.post('/saveVirtualMachines',virtualMachine.saveVirtualMachine);
app.get('/departments',departments.findAll);
app.post('/save',departments.save);
app.get('/servers',nova.findAllServers);
app.post('/servers',nova.createServer);
app.get('/flavors',nova.findAllFlavors);
app.get('/images',glance.findAllImages);
app.get('/userProfile',users.findCurrentUser);


app.post('/register', function(req, res, next) {
    console.log('registering user');

    User.register(new User({username: req.param('username')}), req.param('password'), function(err,user) {
        if (err) {
            console.log('error while user register!', err);
            return res.status(500).send({message:'Error occurred during registration'+JSON.stringify(err)});
        }

        console.log('user registered!');

        res.status(200).send({message:'User successfully registered.'});
    });
});


app.post('/login',function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
           return res.status(401).send({message:'Please enter valid credentials.'})
        }
        // Redirect if it fails
        if (!user) {
            return res.status(401).send({message:'Please enter valid credentials.'})
        }
        req.logIn(user, function(err) {
            if (err) {
               return res.status(401).send({message:'Please enter valid credentials.'})
            }
            // Redirect if it succeeds
            return res.status(200).send({user:user})
        });
    })(req, res, next);

});

app.get('/logout', function(req, res) {
    req.logout();
    res.send({message:'You are logged out!'});
});


app.use(function(req, res) {
    Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.use(function(req,res,next){

    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
