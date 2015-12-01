
var virtualMachine=require('../models/virtualMachine');

/*
var saveVirtualMachine= function(req,res) {
    console.log('in departments POST- save virtual machine');
    var userName = req.body.userName;
    var image = req.body.image;
    var createdDate = Date.now;
    var terminationDate= req.body.terminationDate;
    var departmentName=req.body.departmentName;
    var prebuiltApp=req.body.preBuiltApp;
    var isActive=false;
    var flavour=req.body.flavour;
    var memory;
    var cpu;
    if(flavour == "tiny"){
        memory="512";
        cpu="1";
    }else if(flavour == "small"){
        memory="2048";
        cpu="1";
    }else{
        memory="4096";
        cpu="2";
    }
    virtualMachine = new virtualMachine({
        departmentName : departmentName,
        userName: userName,
        image: image,
        createdDate: createdDate,
        terminationDate: terminationDate,
        isActive:isActive,
        preBuiltApp: prebuiltApp,
        memory: memory,
        cpu: cpu
    });

    virtualMachine.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
            res.Jsonn({
                message: 'virtual machine added'
            });

    });
}
*/

//exports.saveVirtualMachine=saveVirtualMachine;

var saveVirtualMachine = (req,res,next) =>{

    console.log('in VM - save virtual machine');
    var userName = "vidya.khadsare";
    var image = "cirros";
    var createdDate = "2015-08-01";
    var terminationDate= "2015-09-01";
    var departmentName="Testing";
    var prebuiltApp="XYZ";
    var isActive="true";
    var flavour="Tiny";
    var memory;
    var cpu;
    if(flavour == "tiny"){
        memory="512";
        cpu="1";
    }else if(flavour == "small"){
        memory="2048";
        cpu="1";
    }else{
        memory="4096";
        cpu="2";
    }
    var VM = new virtualMachine({
        departmentName : departmentName,
        userName: userName,
        image: image,
        createdDate: createdDate,
        terminationDate: terminationDate,
        isActive:isActive,
        preBuiltApp: prebuiltApp,
        memory: memory,
        cpu: cpu
    });

    VM.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        /*res.send({
            message: 'virtual machine added'
        });*/

    });

    console.log('in VM - save virtual machine');
    var userName = "vidya.khadsare";
    var image = "UBUNTU";
    var createdDate = "2015-08-01";
    var terminationDate= "2015-09-01";
    var departmentName="Dev";
    var prebuiltApp="XYZ";
    var isActive="false";
    var flavour="Small";
    var memory;
    var cpu;
    if(flavour == "tiny"){
        memory="512";
        cpu="1";
    }else if(flavour == "small"){
        memory="2048";
        cpu="1";
    }else{
        memory="4096";
        cpu="2";
    }
    var VM = new virtualMachine({
        departmentName : departmentName,
        userName: userName,
        image: image,
        createdDate: createdDate,
        terminationDate: terminationDate,
        isActive:isActive,
        preBuiltApp: prebuiltApp,
        memory: memory,
        cpu: cpu
    });

    VM.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        res.send({
            message: 'virtual machine added'
        });
    });
}

var findAllActiveVMs = (req,res,next) =>{
    virtualMachine.find({ isActive: true },function(err,VMs){
        console.log(req.user)
        console.log("Active VMs"+JSON.stringify(VMs))
        res.send({data:VMs});
    })
}
var findAllInactiveVMs = (req,res,next) =>{
    virtualMachine.find({ isActive: false },function(err,VMs){
        console.log(req.user)
        console.log("Inactive VMs"+JSON.stringify(VMs))
        res.send({data:VMs});
    })
}
var findAllActiveVMCount = (req,res,next) =>{

    virtualMachine.count({ isActive: true },function(err,count){
        console.log(req.user)
        console.log("Active VMs"+JSON.stringify(count))
        res.status(200).send({data:count});
    })

}

exports.saveVirtualMachine = saveVirtualMachine;
exports.findAllActiveVMList = findAllActiveVMs;
exports.findAllInactiveVMList = findAllInactiveVMs;
exports.findAllActiveVMCnt = findAllActiveVMCount;
