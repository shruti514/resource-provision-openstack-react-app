var localStrategy = require('passport-local').Strategy;
var user = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

passport.use('login', new localStrategy({
        passReqToCallback: true
    },

    function(req, username, password, done) {
        //check in mongo if a user exists or not
        user.findOne({
                'username': username
            },
            function(err, user) {
                //return error if error using done method
                if (err) {
                    return done(err);
                }
                //if username doesn't exist, log error and return back
                if (!user) {
                    console.log('Usernotfound with username ' + username);
                    return done(null, false, req.flash('message', 'User not found.'));
                }
                //user exists but wrong password entered
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password.');
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                //user and password matched
                return done(null, user);
            }
        );
    }
));

var isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
}
