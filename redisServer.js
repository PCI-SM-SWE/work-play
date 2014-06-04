var redis = require("redis"),
    client = redis.createClient(null,"107.170.173.86",null);
var count = 0;
client.on("error", function (err) {
    console.log("Error " + err);
    if (count === 4) {
	console.log("Connection timeout");
	client.end();
	throw { name: 'Connection Timeout', message: 'Connecting to redis took too long' };
    }
    count = count + 1;
    console.log("Connection timeout in: " + (4 - count));
});

function addUser (name) {
    client.rpush("users", (client.llen("users") + 1));
    client.hset("user:" + client.llen("users"), "name", name);
}

addUser("jimmy");

//client.hmset("user:1", "name", "tolga", "work", "5");
//client.hmset("user:2", "name", "bill", "work", "8");

//client.hgetall("user:1", function(err, response) {
    //console.dir(response);
//});

for(var i = 0; i < 5; i++) {
    client.hgetall("user:" + i, function(err, response) {
        console.dir(response);
    });
}
client.quit();