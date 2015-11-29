
var Nova = require("openclient").getAPI('openstack', 'compute', '1.1');

var client = new Nova({
    url: 'http://localhost:5000/v2.0/',
    debug: true
}).authenticate({
    username: 'nova',
    password: '630b508c42f64d26',
    project: 'services',
    async: false
});

var findAllServers = (req, res, next) => {
    client.servers.all({ async: false }, function (err, servers) {
        var toReturn = [];
        servers.map((server, index) => {
            var temp = {
                id: server.id,
                name: server.name,
                status: server.status,
                image: server.image.id,
                flavor: server.flavor.id
            };
            toReturn.push(temp);
        });
        res.send(toReturn);
    });
};

var findAllFlavors = (req, res, next) => {
    client.flavors.all({ async: false }, function (err, flavors) {
        var toReturn = [];
        flavors.map((flavor, index) => {
            var temp = {
                id: flavor.id,
                name: flavor.name,
                ram: flavor.ram,
                vcpus: flavor.vcpus,
                disk: flavor.disk,
                swap: flavor.swap
            };
            toReturn.push(temp);
        });
        res.send(toReturn);
    });
};

exports.findAllServers = findAllServers;
exports.findAllFlavors = findAllFlavors;

//# sourceMappingURL=nova-compiled.js.map