var redis = require("redis"),

//throws error if 5 consecutive connections attempts are unsuccessful
client = redis.createClient(6379, "107.170.173.86", {max_attempts:5});

client.on("error", function (err) {
	if(err) {
		console.log(err);
	}
});

function searchUser(name) {
	client.llen("users", function(err, length) {
		if(err) {
			console.log(err);
		}
		else {
			for(var i = 0; i < length; i++ ) {
				client.lindex("users", i, function(err, found) {
					if(err) {
						console.log(err);
					}
					else {
						if(found === name) {
							console.log("found at " + i);
						}
					}
				});
			}
		}
	});
}

function addUser(first, last) {
	var userNum;
	client.rpush("users", first + "_" + last, function(err, reply){
		if (err) {
			console.log(err);
		}
		else{
			userNum = reply - 1;
			client.hmset("user" + userNum, "name", first + "_" + last, function(err, reply) {
				if(err) {
					console.log(err);
				}
			});
		}
	});
}

function addActivity(user, activity) {
	client.llen("users", function(err, length) {
		if(err) {
			console.log(err);
		}
		else {
			for(var i = 0; i < length; i++ ) {
				client.lindex("users", i, function(err, found) {
					if(err) {
						console.log(err);
					}
					else {
						if(found === user) {
							console.log("found at "+ i);
							client.lindex("points", activity, function(err, pontValue) {
								if(err) {
									console.log(err);
								}
								else {
									client.llen("points", function(err, pontsLength) {
										if(err) {
											console.log(err);
										}
										else {
											for(var i = 0; i < pointsLength; i++) {
												
											}
										}
									});
								}
							});
						}
					}
				});
			}
		}
	});
}
//addUser("humphrey", "huang");
searchUser("humphrey_huang");
//client.quit();