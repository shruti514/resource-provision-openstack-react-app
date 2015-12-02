
var Glance = require("openclient").getAPI('openstack', 'image', '1.0');
var Stubs = require("../stubs/stubs");

var client = new Glance({
    url: 'http://localhost:5000/v2.0/',
    debug: true
}).authenticate({
    username: 'nova',
    password: '630b508c42f64d26',
    project: 'services',
    async: false
});

var findAllImages = (req,res,next) =>{
    var user = req.user;
    if(user) {

            if ("Testing" === user.department) {
                var testingClient = new Glance({
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
                    testingClient.images.all({async:false},function(err,images){
                        var toReturn=[];
                        images.map((image,index)=>{
                            var temp = {
                                id:image.id,
                                uri:image.uri,
                                name:image.name,
                                disk_format:image.disk_format,
                                size:image.size,
                                is_public:image.is_public,
                                min_ram:image.min_ram,
                                min_disk:image.min_disk
                            }
                            toReturn.push(temp)
                        });
                        res.send(toReturn);
                    })

                });
            }
            if ("Development" === user.department) {
                var developmentClient = new Glance({
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
                    developmentClient.images.all({async:false},function(err,images){
                        var toReturn=[];
                        images.map((image,index)=>{
                            var temp = {
                                id:image.id,
                                uri:image.uri,
                                name:image.name,
                                disk_format:image.disk_format,
                                size:image.size,
                                is_public:image.is_public,
                                min_ram:image.min_ram,
                                min_disk:image.min_disk
                            }
                            toReturn.push(temp)
                        });
                        res.send(toReturn);
                    })

                });
            }
    }else{
        res.status(401).send({message:'No session found'})
    }

}

var getImageName = (image) =>{
    console.log("Image called!");
           client.images.get({id:image},function(img) {
           var toReturn = img.name;
           res.send(toReturn);
        });

    }

exports.findAllImages = findAllImages;
exports.getImageName = getImageName;