var application = function (socket)
{
	this.socket = socket;
};

application.prototype.sendData = function (firstName, lastName, activity)
{
	var parameters = {'firstName': firstName, 'lastName': lastName, 'activity': activity};
	this.socket.emit ("sendData", parameters);
};

