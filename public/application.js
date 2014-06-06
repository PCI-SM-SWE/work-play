var application = function (socket)
{
	this.socket = socket;
};

application.prototype.getScoreboard = function ()
{
	this.socket.emit ("getScoreboard");
};

application.prototype.submitActivity = function (firstName, lastName, activity)
{
	var parameters = {'firstName': firstName, 'lastName': lastName, 'activity': activity};
	this.socket.emit ("submitActivity", parameters);
};

