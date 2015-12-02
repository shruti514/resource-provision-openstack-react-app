
var Nova = require("openclient").getAPI('openstack', 'compute', '1.1');
var Glance = require("openclient").getAPI('openstack', 'image', '1.0');
var VirtualMachine = require('../models/virtualMachine');
var Schedule = require('node-schedule');


var client = new Nova({
        url: 'http://localhost:5000/v2.0/',
        debug: true
    }).authenticate({
        username: 'admin',
        password: 'c6adeda5d08640a8',
        project: 'admin',
        async: false
    });

var glanceClient = new Glance({
    url: 'http://localhost:5000/v2.0/',
    debug: true
}).authenticate({
    username: 'admin',
    password: 'c6adeda5d08640a8',
    project: 'admin',
    async: false
});

var findAllServers = (req,res,next) =>{

    var user = req.user;
    if(user) {
        if ("Testing" === user.department) {
            var testingClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'TestingAccount',
                password: 'test',
                project: 'Testing Team',
                async: false
            }, function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Error authenticating Testing team account'})
                }
                console.log('called');
                testingClient.servers.all({
                    async: false
                }, function (err, data) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching Servers for Testing team account'})
                    }
                    res.send(data);
                });
            });
        }
        if ("Development" === user.department) {
            var developmentClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'DeveloperAccount',
                password: 'test',
                project: 'Development Team',
                async: false
            }, function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Error authenticating Development team account'})
                }
                console.log('called');
                developmentClient.servers.all({
                    async: false,
                    id: developmentClient.tenant.id
                }, function (err, data) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching Servers for DevelopmentTeam team account'})
                    }
                    res.send(data);
                });

    client.servers.all({async:false},function(err,servers){
        var toReturn=[];
        if(servers){
            glanceClient.images.all({async:false}, function (err, images) {
                //var toReturn = image.name;

                servers.map((server,index)=>{
                    var imageName=''
                    if(images){
                       images.forEach((image,index)=>{
                            if(image.id==server.image.id){
                                imageName= image.name;
                            }
                        })
                    }
                    var temp = {
                        id:server.id,
                        name:server.name,
                        status: server.status,
                        image:imageName,
                        flavor:server.flavor.id
                    };
                    toReturn.push(temp);
                });
                res.send(toReturn)
            });

        }else{
            res.send(toReturn)
        }
    })
};

var findAllFlavors = (req,res,next) =>{
    client.flavors.all({async:false},function(err,flavors){
        var toReturn=[];
        flavors.map((flavor,index)=>{
            var temp = {
                id:flavor.id,
                name:flavor.name,
                ram: flavor.ram,
                vcpus:flavor.vcpus,
                disk:flavor.disk,
                swap:flavor.swap
            };
            toReturn.push(temp);
        });
        res.send(toReturn);
    })
};

var createServer = (req,res,next)=>{

    var user = req.user;
    var terminationDate=new Date(req.body.terminationDate);
    var day=terminationDate.getDate();
    var year=terminationDate.getYear();
    var month=terminationDate.getMonth();
    var dateToTerminate= new Date(year, month, day,0,0,0);


    if(user) {
        VirtualMachine = new VirtualMachine({
            username:user.username,
            image:req.body.imageId,
            createdDate:new Date(),
            terminationDate:new Date(req.body.terminationDate),
            department:user.department,
            preBuiltApp: req.body.app
        });

        VirtualMachine.save(function(err,data){
            if(err){
                console.log(JSON.stringify(err)+"**** Data*****"+JSON.stringify(data))
                res.status(500).send({message:'Error persisting instance details.'})
            }
            if ("Testing" === user.department) {
                console.log('Inside tester')
                var testingClient = new Nova({
                    url: 'http://localhost:5000/v2.0/',
                    debug: true
                }).authenticate({
                    username: 'TestingAccount',
                    password: 'test',
                    project: 'Testing Team',
                    async: false
                }, function (err, data) {
                    if (err) {

                        res.status(500).send({message: 'Error authenticating Testing team account'})
                    }
                    console.log('called');
                    var serverData={
                        name: "new-server-test-team",
                        imageRef: req.body.imageId,
                        flavorRef: req.body.flavorId,
                        networks:["d89ee3b1-88b4-4a70-9574-66ba7bdd062d"],
                        metadata: {
                            "My Server Name": "Apache1"
                        }
                    };

                    testingClient.servers.create({
                        data: serverData,
                        async: false
                    },function(err,data){
                        if(err){
                            res.status(500).send({message:'Error occurred while creating an instance.Please try again.'});
                        }

                            res.send({message:"Server created successfully!!",data:data});

                    });

                });
            }
            if ("Development" === user.department) {
                console.log('Inside developer')
                var developmentClient = new Nova({
                    url: 'http://localhost:5000/v2.0/',
                    debug: true
                }).authenticate({
                    username: 'DeveloperAccount',
                    password: 'test',
                    project: 'Development Team',
                    async: false
                }, function (err, data) {
                    if (err) {
                        alert('Error: Client '+JSON.stringify(err))
                        res.status(500).send({message: 'Error authenticating Development team account'})
                    }
                    console.log('called');
                    var serverData={
                        name: "new-server-devel-team",
                        imageRef: req.body.imageId,
                        flavorRef: req.body.flavorId,
                        networks:["4ff9ed40-58e0-473d-a91a-29b800aa8c8c"],
                        metadata: {
                            "My Server Name": "Apache1"
                        }
                    };

                    developmentClient.servers.create({
                        data: serverData,
                        async: false
                    },function(err,data){
                        if(err){
                            alert('Error: after create'+JSON.stringify(err))
                            res.status(500).send({message:'Error occurred during instance creation.Please try again.'});
                        }
                            res.send({message:"Server created successfully!!",data:data});
                    });

                });
            }
        })
    }else{
        res.status(401).send({message:'No session found'})
    }

};

var getQuotasForTenant=(req,res,next)=>{
    var user = req.user;
    if(user) {
        if ("Testing" === user.department) {
            var testingClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'TestingAccount',
                password: 'test',
                project: 'Testing Team',
                async: false
            }, function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Error authenticating Testing team account'})
                }
                console.log('called');
                testingClient.quotas.get({
                    async: false,
                    id: testingClient.tenant.id
                }, function (err, data) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching Quota for Testing team account'})
                    }
                    res.send(data)
                });
            });
        }
        if ("Development" === user.department) {
            var developmentClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'DeveloperAccount',
                password: 'test',
                project: 'Development Team',
                async: false
            }, function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Error authenticating Development team account'})
                }
                console.log('called');
                developmentClient.quotas.get({
                    async: false,
                    id: developmentClient.tenant.id
                }, function (err, data) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching Quota for DevelopmentTeam team account'})
                    }
                    res.send(data)
                });
            });
        }
    }else{
        res.status(401).send({message:'No session found'})
    }
};

var  getStats = (req,res,next)=>{
    var user = req.user;
    if(user) {
        if ("Testing" === user.department) {
            var testingQuota;
            var testingUsage;
            var testingClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'TestingAccount',
                password: 'test',
                project: 'Testing Team',
                async: false
            }, function (err, data) {
                console.log('called');
                if (err) {
                    res.status(500).send({message: 'Error authenticating Testing team account'})
                }
                testingClient.quotas.usages({
                    async: false,
                    id: testingClient.tenant.id
                }, function (err, usage) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching usage details for Testing team account'})
                    }
                    testingUsage = usage;
                    testingClient.quotas.get({
                        async: false,
                        id: testingClient.tenant.id
                    }, function (err, quota) {
                        if (err) {
                            res.status(500).send({message: 'Error fetching quota for testing team'})
                        }

                        testingQuota = quota;
                        res.send(buildStatsResponse(testingUsage, testingQuota))
                    });

                });
            });
        }
        if ("Development" === user.department) {
            var develQuota;
            var develUsage;
            var developmentClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'DeveloperAccount',
                password: 'test',
                project: 'Development Team',
                async: false
            }, function (err, data) {
                if (err) {
                    res.status(500).send({message: 'Error authenticating Development team account'})
                }
                developmentClient.quotas.usages({
                    async: false,
                    id: developmentClient.tenant.id
                }, function (err, usage) {
                    if (err) {
                        res.status(500).send({message: 'Error fetching usage details for Development team account'})
                    }
                    develUsage = usage;
                    developmentClient.quotas.get({
                        async: false,
                        id: developmentClient.tenant.id
                    }, function (err, quota) {
                        if (err) {
                            res.status(500).send({message: 'Error fetching quota for Development team account'})
                        }
                        develQuota = quota;
                        res.send(buildStatsResponse(develUsage, develQuota))
                    });
                });
            });
        }
    }else{
        res.status(401).send({message:'No session found'})
    }
}

var buildStatsResponse=(usage,quota)=>{
    console.log("Usage"+JSON.stringify(usage));
    console.log("Quota"+JSON.stringify(quota));
    return {
        ram:{
            quota:quota.ram,
            usage:usage.ram
        },
        vcpus:{
            quota:quota.vcpus,
            usage:usage.vcpus
        },
        cores:{
            quota:quota.cores,
            usage:usage.cores
        },
        instances:{
            quota:quota.instances,
            usage:usage.instances
        }
    }
}


var getUsage=(req,res,next)=>{

    var user = req.user;
    if(user) {
        if ("Testing" === user.department) {
            var testingClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'TestingAccount',
                password: 'test',
                project: 'Testing Team',
                async: false
            }, function (err, data) {
                console.log('called');
                var usage = testingClient.quotas.usages({
                    async: false,
                    id: testingClient.tenant.id
                }, function (err, data) {
                    res.send(data)
                });
            });
        }
        if ("Development" === user.department) {
            var developmentClient = new Nova({
                url: 'http://localhost:5000/v2.0/',
                debug: true
            }).authenticate({
                username: 'DeveloperAccount',
                password: 'test',
                project: 'Development Team',
                async: false
            }, function (err, data) {
                console.log('called');
                var usage = developmentClient.quotas.usages({
                    async: false,
                    id: developmentClient.tenant.id
                }, function (err, data) {
                    res.send(data)
                });
            });
        }
    }else{
        res.status(401).send({message:'No session found'})
    }


}

exports.findAllServers = findAllServers;
exports.createServer = createServer;
exports.findAllFlavors = findAllFlavors;
exports.getQuotasForTenant = getQuotasForTenant;
exports.getUsage = getUsage;
exports.getStats = getStats;