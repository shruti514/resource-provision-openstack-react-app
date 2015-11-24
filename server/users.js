var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User({
        //set username and password received from POST data
        username: req.body.username,
        password: req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        designation:req.body.designation,
        emailId:req.body.emailId,
        contactNumber:req.body.contactNumber
    });

    //save user and check for errors
    user.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json({
            message: 'User added'
        });
    });
};

var findCurrentUser = (req,res,next) =>{

    if(req.user){
        console.log("User"+JSON.stringify(req.user))
        res.send(req.user)
    }else{
        res.status(401).send({message:"No session found.Please login or sign-up."})
    }
}

exports.findCurrentUser = findCurrentUser;