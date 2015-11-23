
var Glance = require("openclient").getAPI('openstack', 'image', '1.0');
var Stubs = require("../stubs/stubs");

var client = new Glance({
    url: 'http://localhost:5000/v2.0/',
    debug: true
}).authenticate({
    username: 'admin',
    password: '13945916bd0645e1',
    project: 'admin',
    async: false
});

var findAllImages = (req,res,next) =>{

        client.images.all({async:false},function(err,images){
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
}

exports.findAllImages = findAllImages;