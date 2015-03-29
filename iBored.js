// function defaultPage() {
//     document.getElementById("submit-events-page").style.display = 'none';  
//     document.getElementById("main-page").style.display = 'block';
// }

console.log("js is working");
Events = new Mongo.Collection("events");
var error = false;

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
        Template.getEvent.rendered = function () {
            console.log("1st point");
            var getEventInfo = document.getElementById("listedEvent");
            console.log("2nd point");  //get more event into
            getEventInfo.onclick = function() { 
                console.log("clicked for detail");
                document.getElementById("submit-event-page").style.display = 'none';  
                document.getElementById("main-page").style.display = 'none';
                document.getElementById("event-details").style.display = 'block';
                }
            }
     }
     // This code only runs on the client
    
    Template.mainPageBody.helpers({
        events: function(){
            console.log("inside fn");
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
        var eventEnd = event.target.eventEnd.value;
        var lat = Geolocation.latLng().lat;
        var lng = Geolocation.latLng().lng;
        
        // 5 for debugging for now
        if (eventTitle.length > 140) {
            error = true;
            $("#titleError").show();
            $("#titleError").empty();
            $("#titleError").append("<span class='error'> Must be less than 140 char </span>");
        } else if (eventTitle.length < 1) {
            error = true;
            $("#titleError").show();
            $("#titleError").empty();
            $("#titleError").append("<span class='error'> Must not be empty </span>");
        } else {
            error = false;
            $("#titleError").hide();
        }

        if (!error) {
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
