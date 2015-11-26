var mongoose = require('mongoose');

var virtualMachine= new mongoose.Schema({
    userName: String,
    image: String,
    createdDate: Date,
    terminationDate: Date,
    departmentName: String,
    isActive:Boolean,
    preBuiltApp: String,
    memory: String,
    cpu: String

});

module.exports = mongoose.model('virtualMachine',virtualMachine);
