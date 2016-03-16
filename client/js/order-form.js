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
	'submit #insertOrderForm': function(event){

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
