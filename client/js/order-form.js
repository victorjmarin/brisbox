function getParameterByName(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

Template.orderForm.events({
	'click #loading': function(event){
		var loading = document.getElementById('loading').checked;
		if(loading == true){
			$('.addressLoading').css('visibility','visible');
			$('#addressLoading').prop('required',true);
		}
		if(loading==false){
			$('.addressLoading').css('visibility','hidden');
			$('#addressLoading').prop('required',false);
		}
	},
	'click #unloading': function(event){
		var unloading = document.getElementById('unloading').checked;
		if(unloading == true){
			$('.addressUnloading').css('visibility','visible');
			$('#addressUnloading').prop('required',true);
		}
		if(unloading == false){
			$('.addressUnloading').css('visibility','hidden');
			$('#addressUnloading').prop('required',false);
		}
	},
	'click .form-more-info': function(event){
		var info = $(event.target);
		var more_info = info.parent().parent().next();
		if (more_info.css("display") == "none"){
			more_info.slideDown("fast");
		}else if(more_info.css("display") !== "none"){
			more_info.slideUp("fast");
		}
	},
	'submit .order_form ' : function (event){
		var loading = document.getElementById('loading').checked;
		var unloading = document.getElementById('unloading').checked;
		if(loading == false && unloading == false){
			$('.errorAddress').css('visibility','visible');
			return false;
		}
		var orderForm = ({
			addressLoading: document.getElementById("addressLoading").value,
			addressUnloading: document.getElementById("addressUnloading").value,
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
			email: document.getElementById("email").value,
			brisboxers: []
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
	var zip = getParameterByName("zip");
	if(zip != null){
		Session.set("zip", zip);
		document.getElementById("label-zip").className = "active";
	}else{
		document.getElementById("label-zip").className = "";
	}
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
	},
	zip: function(){
		var zip = Session.get("zip");
		return zip;
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
