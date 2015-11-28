var User = require('../models/user');

var findCurrentUser = (req,res,next) =>{

    if(req.user){
        console.log("User"+JSON.stringify(req.user))
        res.send(req.user)
    }else{
        res.status(401).send({message:"No session found.Please login or sign-up."})
    }
}

exports.findCurrentUser = findCurrentUser;