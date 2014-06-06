var app = angular.module ('gamification', []);

var socket = io.connect();
var application;

app.controller ('mainCtrl', function ($scope)
{
	function sort (array)
	{
		var i;
		var j;
		var largestIndex;
		
		for (i = 0; i < array.length; i++)
		{			
			largestIndex = i;
			
			for (j = i + 1; j < array.length; j++)
			{
				if (parseInt(array[j].points) > parseInt(array[largestIndex].points))
					largestIndex = j;
			}
			
			var temp = array[i];
			array[i] = array[largestIndex];
			array[largestIndex] = temp;
		}
		
		return (array);		
	}
	
	$(document).ready (function ()
	{	
		application = new application (socket);	
		application.getScoreboard ();
		
		socket.on ('error message', function (err)
		{
			alert (err);				
		});
		
		socket.on ('scoreboardData', function (parameters)
		{
			$('#scoreboardBody').empty ();
			
			var array = parameters;
			var newArray = new Array ();
			var i;
						
			for (i = 0; i < array.length; i++)
			{
				newArray.push (array[i].person);
			}
			
			array = sort (newArray);
			
			for (i = 0; i < array.length; i++)
			{
				console.log (array[i].name + " " + array[i].points);
				var tr = document.createElement ('tr');
				var td1 = document.createElement ('td');
				td1.innerHTML = i + 1;
				var td2 = document.createElement ('td');
				td2.innerHTML = array[i].name;
				var td3 = document.createElement ('td');
				td3.innerHTML = array[i].points;
				tr.appendChild (td1);
				tr.appendChild (td2);
				tr.appendChild (td3);
				$('#scoreboardBody').append (tr);				
			}			
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
		var lastName = user.substring (0, user.indexOf ('('));
		
		//alert (firstName + "\n" + lastName + "\n" + activity);
		application.submitActivity (firstName, lastName, activity);
		//finish
	};	
});