var socketio = require('socket.io');
var fs = require ('fs');
var io;

var redis = require("redis");
var client = redis.createClient(6379, "107.170.173.86", {max_attempts:5});
var async = require ('async');

client.on("error", function (err) {
	console.log(err);
});

var hashArray;

exports.listen = function(server) 
{
	io = socketio.listen(server);
	io.set('log level', 1);
	
	io.sockets.on ('connection', function (socket)
	{
		getScoreboard (socket);
		submitActivity (socket);		
	});	
};

function getScoreboard (socket)
{
	socket.on ('getScoreboard', function ()
	{
		var i = 1;		
		var done = false;
		hashArray = new Array ();
		
		async.whilst(
		        function ()
		        {
		                return (done == false);
		        },
		        function (callback)
		        {
		                client.hgetall("user:"+i, function (err, reply)
		                {
		                        var person = {name: '', points: ''};
		                        
		                        if (reply == null)
		                        {
		                                done = true;
		                                return;
		                        }
		                        else
		                        {
		                                person.name = reply.name;
		                                person.points = reply.points;
		                                var object = {hashid: "user:"+i, person: person};
		                                hashArray.push (object);
		                        }         
		                        i++;
		                });  
		                
		                setTimeout(callback, 1000);
		        },
		        function (err)
		        {
		                console.log ("done");
		                console.log (hashArray);
		                socket.emit ('scoreboardData', hashArray);
		        }
		);
	});
}

function submitActivity (socket)
{
	var i;
	
	socket.on ('submitActivity', function (parameters)
	{
		console.log (parameters);
		
		var firstName = parameters['firstName'];
		var lastName = parameters['lastName'];
		var activity = parameters['activity'];		
		var activityPoints = 0;
		var hashid;
		var currentPoints = 0;
		var found = false;
		
		//activity values
		if (activity === "Attend Brownbag Session")
			activityPoints = 1;
		
		for (i = 0; i < hashArray.length; i++)
        {
        	if (hashArray[i].person.name === firstName + " " + lastName)
        	{
        		hashid = hashArray[i].hashid;
        		currentPoints = hashArray[i].person.points;
        		client.hset (hashid, "points", parseInt(currentPoints) + activityPoints);
        		hashArray[i].person.points = parseInt(currentPoints) + activityPoints;
        		
        		console.log (hashArray);
        		socket.emit ('scoreboardData', hashArray);
        		found = true;
        	}		
        }
		
		if (found == false)
		{
			var newPerson = {name: firstName + " " + lastName, points: activityPoints};
    		var hashid = "user:" + (parseInt(hashArray.length) + 1);
    		
    		hashArray.push ({hashid: hashid, person: newPerson});
    		
    		console.log (hashid);
    		client.hset (hashid, "name", newPerson.name);
    		client.hset (hashid, "points", newPerson.points);
         		
    		
    		socket.emit ('scoreboardData', hashArray);
		}
	});
}