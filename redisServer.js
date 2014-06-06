var redis = require("redis"),

//throws error if 5 consecutive connections attempts are unsuccessful
client = redis.createClient(6379, "107.170.173.86", {max_attempts:5});

client.on("error", function (err) {
	console.log(err);
});

var test = client.get("mykey", redis.print);

console.log(test);



//function addUser (name) {
//client.rpush("users", name);
//client.llen('users', function(err, count){
//client.ping();
//client.hset("user:2", "name", "frank", redis.print);
//client.hset(("user:" + count), "name", name, redis.print);
//});
//}

//addUser("jimmy");
//client.hset("user:3", "name", "tolga");



//client.hmset("user:1", "name", "tolga", "work", "5");
//client.hgetall("user:1", function(err, response) {
//console.dir(response);
//});



//for(var i = 1; i < 5; i++) {
//client.hgetall("user:" + i, function(err, response) {
//console.dir(response);
//});
//}
//client.llen('users', function(err, ret){
//console.dir(ret);
//});
client.quit();