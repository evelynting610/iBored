// function defaultPage() {
//     document.getElementById("submit-events-page").style.display = 'none';  
//     document.getElementById("main-page").style.display = 'block';
// }

console.log("js is working");
Events = new Mongo.Collection("events");
if (Meteor.isClient) {

	Template.mainPageBody.rendered = function () {
	    document.getElementById("submit-event-page").style.display = 'none';  
		document.getElementById("main-page").style.display = 'block';
		document.getElementById("event-details").style.display = 'none';
		var postEventButton = document.getElementById("postEvent"); //post an event
	   		// add onclick event 
	   		postEventButton.onclick = function() { 
	        	document.getElementById("submit-event-page").style.display = 'block';  
	        	document.getElementById("main-page").style.display = 'none';
	        	document.getElementById("event-details").style.display = 'none';
	        }
	    var goBackButton = document.getElementById("returnToMainPage");  //go back to main page
	    goBackButton.onclick = function() { 
	        	document.getElementById("submit-event-page").style.display = 'none';  
	        	document.getElementById("main-page").style.display = 'block';
	        	document.getElementById("event-details").style.display = 'none';
	        }
	    /*var getEventInfo = document.getElementById("listedEvent");  //get more event into
	    getEventInfo.onclick = function() { 
	        document.getElementById("submit-event-page").style.display = 'none';  
	        document.getElementById("main-page").style.display = 'none';
	        document.getElementById("event-details").style.display = 'block';
	        }*/
	 }
     // This code only runs on the client
    
    Template.mainPageBody.helpers({
    	events: function(){
    		//CHECKS if location is close enough
    		if (Geolocation.latLng()){
  				var userLat= Geolocation.latLng().lat;    //USER lat refers to listener
  				var userLng= Geolocation.latLng().lng;
				var upperLat = userLat+0.0224982;
				var lowerLat = userLat-0.0224982;

				var additive = 2.5/(Math.cos(userLat)*111.321);
				var upperLng = userLng+additive;
				var lowerLng = userLng-additive;
				console.log(upperLat, lowerLat, upperLng,lowerLng);}

			else{
				return;
			}
			return Events.find();
			/*var e;

			for e in Events.find( { 'lat': { $lt: upperLat }, 'lng': {$lt: upperLng} } )
			  if(e['lat']>lowerLat && e['lng']>lowerLng)
			    console.log(e);
			        return Events.find();*/
		}
	});
    Template.addEventForm.events({
	    "submit form": function (evt) {
		// This function is called when the new event form is submitted
		evt.preventDefault();
		console.log("Form submitted");
		console.log(evt.type);
		var eventTitle = event.target.eventTitle.value;
		var eventLocation = event.target.eventLocation.value;
		var eventStart = event.target.eventStart.value;
		var eventEnd = event.target.eventEnd.value;
		var lat = Geolocation.latLng().lat;
		var lng = Geolocation.latLng().lng;
		Events.insert({
			title: eventTitle,
			createdAt: new Date(), // current time
			startTime: eventStart,
			endTime: eventEnd,
			nominalLocation: eventLocation, // location user says event is at
			lat: lat,
        	lng: lng,
			    // user: Meteor.user(),
			hearts: 0,
			heartingUsers: [] //list of users who heart the event
		});


		// Clear form
		event.target.eventTitle.value = "";
		event.target.eventLocation.value = "";
		event.target.eventStart.value = "";
		event.target.eventEnd.value = "";

		// Prevent default form submit
		return false;
   		}
	});
	    
}// function defaultPage() {
//     document.getElementById("submit-events-page").style.display = 'none';  
//     document.getElementById("main-page").style.display = 'block';
// }

console.log("js is working");
Events = new Mongo.Collection("events");
if (Meteor.isClient) {

	Template.mainPageBody.rendered = function () {
	    document.getElementById("submit-event-page").style.display = 'none';  
		document.getElementById("main-page").style.display = 'block';
		document.getElementById("event-details").style.display = 'none';
		var postEventButton = document.getElementById("postEvent"); //post an event
	   		// add onclick event 
	   		postEventButton.onclick = function() { 
	        	document.getElementById("submit-event-page").style.display = 'block';  
	        	document.getElementById("main-page").style.display = 'none';
	        	document.getElementById("event-details").style.display = 'none';
	        }
	    var goBackButton = document.getElementById("returnToMainPage");  //go back to main page
	    goBackButton.onclick = function() { 
	        	document.getElementById("submit-event-page").style.display = 'none';  
	        	document.getElementById("main-page").style.display = 'block';
	        	document.getElementById("event-details").style.display = 'none';
	        }
	    /*var getEventInfo = document.getElementById("listedEvent");  //get more event into
	    getEventInfo.onclick = function() { 
	        document.getElementById("submit-event-page").style.display = 'none';  
	        document.getElementById("main-page").style.display = 'none';
	        document.getElementById("event-details").style.display = 'block';
	        }*/
	 }
     // This code only runs on the client
    
    Template.mainPageBody.helpers({
    	events: function(){
    		//CHECKS if location is close enough
    		if (Geolocation.latLng()){
  				var userLat= Geolocation.latLng().lat;    //USER lat refers to listener
  				var userLng= Geolocation.latLng().lng;
				var upperLat = userLat+0.0224982;
				var lowerLat = userLat-0.0224982;

				var additive = 2.5/(Math.cos(userLat)*111.321);
				var upperLng = userLng+additive;
				var lowerLng = userLng-additive;
				console.log(upperLat, lowerLat, upperLng,lowerLng);}

			else{
				return;
			}
			return Events.find();
			/*var e;

			for e in Events.find( { 'lat': { $lt: upperLat }, 'lng': {$lt: upperLng} } )
			  if(e['lat']>lowerLat && e['lng']>lowerLng)
			    console.log(e);
			        return Events.find();*/
		}
	});
    Template.addEventForm.events({
	    "submit form": function (evt) {
		// This function is called when the new event form is submitted
		evt.preventDefault();
		console.log("Form submitted");
		console.log(evt.type);
		var eventTitle = event.target.eventTitle.value;
		var eventLocation = event.target.eventLocation.value;
		var eventStart = event.target.eventStart.value;
		var eventEnd = event.target.eventEnd.value;
		var lat = Geolocation.latLng().lat;
		var lng = Geolocation.latLng().lng;
		Events.insert({
			title: eventTitle,
			createdAt: new Date(), // current time
			startTime: eventStart,
			endTime: eventEnd,
			nominalLocation: eventLocation, // location user says event is at
			lat: lat,
        	lng: lng,
			    // user: Meteor.user(),
			hearts: 0,
			heartingUsers: [] //list of users who heart the event
		});


		// Clear form
		event.target.eventTitle.value = "";
		event.target.eventLocation.value = "";
		event.target.eventStart.value = "";
		event.target.eventEnd.value = "";

		// Prevent default form submit
		return false;
   		}
	});
	    
}
