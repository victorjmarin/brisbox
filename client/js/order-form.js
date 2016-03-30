Template.orderForm.events({
	'click .form-more-info': function(event){
		var info = $(event.target);
		var more_info = info.parent().parent().next();
		if (more_info.css("display") == "none"){
			more_info.slideDown("fast");
		}else if(more_info.css("display") !== "none"){
			more_info.slideUp("fast");
		}
	},
	'submit .order_form ' : function (event) {
		var orderForm = ({
			address: document.getElementById("address").value,
			zip: document.getElementById("zip").value,
			loading: document.getElementById("loading").value,
			unloading: document.getElementById("unloading").value,
			comments: document.getElementById("comments").value,
			numberBrisboxers: document.getElementById("numberBrisboxers").value,
			hours: document.getElementById("hours").value,
			day: document.getElementById("day").value,
			name: document.getElementById("name").value,
			surname: document.getElementById("surname").value,
			phone: document.getElementById("phone").value,
			email: document.getElementById("email").value
		});
		Meteor.call("saveOrder", orderForm);
	}
});


Template.orderForm.onRendered(function() {
	GoogleMaps.load();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});
});

Template.orderForm.helpers({
	exampleMapOptions: function() {
		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(37.389434, -5.984706),
				zoom: 13
			};
		}
	}
});

Template.orderForm.onCreated(function() {
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('exampleMap', function(map) {
		// Add a marker to the map once it's ready
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});
});
