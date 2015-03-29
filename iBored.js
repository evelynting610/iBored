// function defaultPage() {
//     document.getElementById("submit-events-page").style.display = 'none';  
//     document.getElementById("main-page").style.display = 'block';
// }
var clickedEvent;
console.log("js is working");
Events = new Mongo.Collection("events");
var error = false;

Meteor.methods({
    removeExpiredEvents: function() {
        var currentTime = new Date();
        var serverTime=currentTime.getHours()+currentTime.getMinutes();
        var exactTime = currentTime.getTime();

        Events.remove(
            {createdAt: {$lt: exactTime-57600000}}  //deletes everything created > 16 hours ago
        )
        if(serverTime<1200){
            Events.remove( 
              { endTime: { $lt: serverTime}}
            )
        }
        else if (serverTime>200){       //in the event that you have a party that ends at 2 AM
            console.log("hit serverTime");
            Events.remove( 
              { endTime: { $lt: serverTime, $gt: 200} }
            )
        }
    }
})

if (Meteor.isClient) {
	Session.setDefault("counter", 0);
	Template.mainPageBody.rendered = function () {
		document.getElementById("submit-event-page").style.display = 'none';  
		document.getElementById("main-page").style.display = 'block';
		//document.getElementById("event-details").style.display = 'none';
		document.getElementById("login-page").style.display = 'block';
		document.getElementById("event-details").style.display = 'none';
		console.log("doc rendered");
		var elems = document.getElementsByClassName('eventDetailsBody');
		for (var i=0;i<elems.length;i+=1){
			document.getElementsByClassName('eventDetailsBody')[i].style.display='none';
			console.log("one elem" + " i= " + i);
		} //this code is not working unless I input it into the console
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
	    	var elems = document.getElementsByClassName('eventDetailsSummary');
		    	var detelems = document.getElementsByClassName('eventDetailsBody');
		    	console.log("elems",elems);
		    	for (var i=0;i<elems.length;i++){
		    		console.log(i);
		    		(function () {
		    			var k = i;
			    		elems[i].onclick = function() {

			    			console.log(k);
			    			console.log(elems[k],detelems[k]);
			    			for (var i=0;i<elems.length;i++){
			    				elems[i].style.display = 'block';
			    			}
			    			detelems[k].style.display='none';
			    			document.getElementById("submit-event-page").style.display = 'none'; 
			    			document.getElementById("event-details").style.display = 'none';
			    			
			    		}
			    		})();
				//this part doesn't work
			}
	    }

	}

	    Template.getEvent.rendered = function () { //get more event into
	    	console.log("rendered");
	    	var heartclickbutton = document.getElementById("heartclick");
		    heartclickbutton.onclick = function() { //update hearts in mongo
		    	console.log("increment counter");
		    	Session.set("counter", Session.get("counter") + 1);
		    }
		    	//hearts = hearts + 1

		    	var elems = document.getElementsByClassName('eventDetailsSummary');
		    	var detelems = document.getElementsByClassName('eventDetailsBody');
		    	console.log("elems",elems);
		    	for (var i=0;i<elems.length;i++){
		    		console.log(i);
		    		(function () {
		    			var k = i;
			    		elems[i].onclick = function() {

			    			console.log(k);
			    			console.log(elems[k],detelems[k]);
			    			for (var i=0;i<elems.length;i++){
			    				elems[i].style.display = 'none';
			    			}
			    			detelems[k].style.display='block';
			    			document.getElementById("submit-event-page").style.display = 'none'; 
			    			document.getElementById("event-details").style.display = 'none';
			    			
			    		}
			    		})();
				//this part doesn't work
			}
		}
		
		/*Template.eventDetailsBody.rendered = function () { //initially don't display eventDetailsBody
			//$('eventDetailsBody').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​,'block');​​​​​​
			eventDetailsBody.$("p").css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​,'block')
		}*/

		
     // This code only runs on the client
     Template.getEvent.helpers({
     	counter: function () {
     		console.log("counter: " +  Session.get("counter"));
     		return Session.get("counter");
     	}
     });
     Template.mainPageBody.helpers({
     	events: function(){
     		// call meteor method
            Meteor.call("removeExpiredEvents");

    		//CHECKS if location is close enough
    		if (Geolocation.latLng()){
    			console.log("latlng");
  				var userLat= Geolocation.latLng().lat;    //USER lat refers to listener
  				var userLng= Geolocation.latLng().lng;
				var upperLat = userLat+0.0224982;
				var lowerLat = userLat-0.0224982;
				var additive = 2.5/(Math.cos(userLat)*111.321);
				var upperLng = userLng+additive;
				var lowerLng = userLng-additive;
				console.log(upperLat, lowerLat, upperLng,lowerLng);}
			else{
				console.log("evelyn");
			}
			return Events.find( { $and: [ { lat: { $lt: upperLat, $gt: lowerLat} }, { lat: { $gt: lowerLat, $lt: upperLat} } ] }).fetch();
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
		var eventEnd = event.target.eventEnd.value.split(':');
		var endTime = parseInt(eventEnd[0])*100+parseInt(eventEnd[1]);
		var lat = Geolocation.latLng().lat;
		var lng = Geolocation.latLng().lng;
		if (eventTitle.length > 140) {
            error = true;
            $("#titleError").show();
            $("#titleError").empty();
            $("#titleError").append("<p class='error'> Must be less than 140 char </p>");
        } else if (eventTitle.length < 1) {
            error = true;
            $("#titleError").show();
            $("#titleError").empty();
            $("#titleError").append("<p class='error'> Must not be empty </p>");
        } else {
            error = false;
            $("#titleError").hide();
        }

        if (!error) {
            Events.insert({
                title: eventTitle,
                createdAt: new Date().getTime(), // current time
                startTime: eventStart,
                endTime: endTime,
                nominalLocation: eventLocation, // location user says event is at
                lat: lat,
                lng: lng,
                    // user: Meteor.user(),
                hearts: 0,
                heartingUsers: [] //list of users who heart the event
            });
        }


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
