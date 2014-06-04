var socketio = require('socket.io');
var fs = require ('fs');
var io;
//var redis = require ('redis');
//var client = redis.createClient ();
/*
client.on("error", function (err) {
    console.log("Error " + err);
});*/

exports.listen = function(server) 
{
	io = socketio.listen(server);
	io.set('log level', 1);
	
	io.sockets.on ('connection', function (socket)
	{
		getData (socket);		
	});	
};

function getData (socket)
{
	socket.on ('sendData', function (parameters)
	{
		console.log (parameters);
		
		var firstName = parameters['firstName'];
		var lastName = parameters['lastName'];
		var activity = parameters['activity'];		
		
		
		//database
		
		
		
		
		//send scoreboard data back
		//socket.emit ('scoreboardData', )
	});
}