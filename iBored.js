if (Meteor.isClient) {
  // This code only runs on the client

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
      Events.insert({
        title: eventTitle,
        createdAt: new Date(), // current time
        startTime: eventStart,
        endTime: eventEnd,
        nominalLocation: eventLocation, // location user says event is at
        locationLat: Geolocation.latLng().lat;
        locationLng: Geolocation.latLng().lng;
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