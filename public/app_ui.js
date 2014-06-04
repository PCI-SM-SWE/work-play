var app = angular.module ('gamification', []);

var socket = io.connect();
var application;

app.controller ('mainCtrl', function ($scope)
{
	$(document).ready (function ()
	{	
		application = new application (socket);	
		
		socket.on ('error message', function (err)
		{
			alert (err);				
		});
		
		socket.on ('scoreboard', function (parameters)
		{
			//append to $('#scoreboardBody')
		});
	});		
	
	
	$scope.activities = ['',
	                     'Attend Brownbag Session',
	                     'Host Brownbag Session',
	                     'Contribute to FOSS project',
	                     'Author Tech Blog Post',
	                     'Host Software Related Meetup',
	                     'Recruit Software Engineer',
	                     'Answer Data Call within 24hrs',
	                     'Participate in Proposal Review',
	                     'Participate in Proposal Writing',
	                     'Contribute to Social Media Presence',
	                     'Win Hack-a-thon',
	                     'Complete MOOC'];
	
	$scope.logOut = function ()
	{		
		//gapi.auth.signOut();	
		//location.reload ();


		window.open ('https://accounts.google.com/logout');		

		//temp.onload = temp.close ();
		//temp.addEventListener ('onload', temp.close (), false);			
	};
	
	$scope.submit = function ()
	{
		var e = document.getElementById ('dropDown');
		var activity = e.options[e.selectedIndex].value;
		
		if (activity === '')
		{
			alert ("Please select an activity.");
			return;
		}
		
		var user = $('#user').text ();
		var firstName = user.substring (0, user.indexOf (' '));
		user = user.substr (user.indexOf (' ') + 1);
		var lastName = user.substring (0, user.indexOf (' '));
		
		alert (firstName + "\n" + lastName + "\n" + activity);
		application.sendData (firstName, lastName, activity);
		//finish
	};	
});