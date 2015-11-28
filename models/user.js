//load required packages
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    department:String,
    designation:String,
    contactNumber:String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);



