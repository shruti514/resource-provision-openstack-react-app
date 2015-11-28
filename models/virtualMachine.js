var mongoose = require('mongoose');

var virtualMachine= new mongoose.Schema({
    username: String,
    image: String,
    createdDate: Date,
    terminationDate: Date,
    department: String,
    isActive:Boolean,
    preBuiltApp: String,
    memory: String,
    cpu: String

});

module.exports = mongoose.model('virtualMachine',virtualMachine);
