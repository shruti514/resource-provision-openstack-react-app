//load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.model('User',{
    id: String,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', User);
