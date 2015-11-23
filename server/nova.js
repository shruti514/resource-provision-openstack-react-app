
var Nova = require("openclient").getAPI('openstack', 'compute', '1.1');

var client = new Nova({
        url: 'http://localhost:5000/v2.0/',
        debug: true
    }).authenticate({
        username: 'admin',
        password: '13945916bd0645e1',
        project: 'admin',
        async: false
    });

var findAllServers = (req,res,next) =>{
    client.servers.all({async:false},function(err,servers){
        var toReturn=[];
        servers.map((server,index)=>{
            var temp = {
                id:server.id,
                name:server.name,
                status: server.status,
                image:server.image.id,
                flavor:server.flavor.id
            }
            toReturn.push(temp)
        });
        res.send(toReturn);
    })
}

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
            }
            toReturn.push(temp);
        });
        res.send(toReturn);
    })
}

var createServer = (req,res,next)=>{
    console.log(req.body.imageId)
    console.log(req.body.flavorId)

    var serverData={
        name: "new-server-test",
        imageRef: req.body.imageId,
        flavorRef: req.body.flavorId,
        networks:["0d6e0cc4-1166-4ea5-8581-905c722af4e7"],
        metadata: {
            "My Server Name": "Apache1"
        }
    }

    var new_server = client.servers.create({
        data: serverData,
        async: false
    });

    res.status(200).send({message:"Server created successfully!!",data:new_server});

}

exports.findAllServers = findAllServers;
exports.createServer = createServer;
exports.findAllFlavors = findAllFlavors;