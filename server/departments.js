var Department = require('../models/department');


/*var findAll = (req,res,next) =>{
    Department.find({}).exec(function(err,departments){
        console.log("After dept call"+JSON.stringify(departments))
        res.send(departments);
    })
}*/

var findAll = (req,res,next) =>{
    Department.find(function(err,departments){
        console.log(req.user)
        console.log("After dept call"+JSON.stringify(departments))
        res.send(departments);
    })
}

var save = (req,res,next) =>{
    var dept = new Department(req.body);

    dept.save(function(err){
        if(err){
            console.log('Error saving data.');
            res.send(err);
        }
        res.send({message:'Dept saved'});

    })

}



exports.findAll = findAll;
exports.save = save;