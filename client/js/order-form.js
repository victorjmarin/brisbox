function getParameterByName(variable) {
    return Router.current().params.query[variable]
}

Template.orderForm.onRendered(function (){
	$('#divAddressUnLoading').css('display','none');
	$('#divAddressLoading').css('display','none');
	$('.modal').closeModal();
	$('.lean-overlay').remove();
	this.$('.timepicker').timepicker();
});


Template.orderForm.events({
	'click #loading': function(event){
		var loading = document.getElementById('loading').checked;
		if(loading == true){
			$('#divAddressLoading').css('display','block');
			$('#divAddressLoading').css('visibility','visible');
			$('#addressLoading').prop('required',true);
		}
		if(loading==false){
			$('#divAddressLoading').css('display','none');
			$('#divAddressLoading').css('visibility','hidden');
			$('#addressLoading').prop('required',false);
		}
	},
	'click #unloading': function(event){
		var unloading = document.getElementById('unloading').checked;
		if(unloading == true){
			$('#divAddressUnLoading').css('display','block');
			$('#divAddressUnLoading').css('visibility','visible');
			$('#addressUnloading').prop('required',true);
		}
		if(unloading == false){
			$('#divAddressUnLoading').css('display','none');
			$('#divAddressUnLoading').css('visibility','hidden');
			$('#addressUnloading').prop('required',false);
		}
	},
	'submit #order-form' : function (event){
		event.preventDefault();
		var loading = document.getElementById('loading').checked;
		var unloading = document.getElementById('unloading').checked;
		if(loading == false && unloading == false){
			$('.errorAddress').css('visibility','visible');
			return false;
		}
		var orderForm = {
			addressLoading: document.getElementById("addressLoading").value,
			addressUnloading: document.getElementById("addressUnloading").value,
			zip: document.getElementById("zip").value,
			loading: document.getElementById("loading").value,
			unloading: document.getElementById("unloading").value,
			comments: document.getElementById("comments1").value,
			numberBrisboxers: document.getElementById("numberBrisboxers").value,
			hours: document.getElementById("hours").value,
			startMoment: document.getElementById("startMoment").value,
			day: document.getElementById("day").value,
			name: document.getElementById("name").value,
			surname: document.getElementById("surname").value,
			phone: document.getElementById("phone").value,
			email: document.getElementById("email").value,
			brisboxers: []
		};
		sessionStorage.setItem("addressLoading",orderForm.addressLoading);
		sessionStorage.setItem("addressLoading",orderForm.addressLoading);
		sessionStorage.setItem("zip",orderForm.zip);
		sessionStorage.setItem("loading",orderForm.loading);
		sessionStorage.setItem("unloading",orderForm.unloading);
		sessionStorage.setItem("comments",orderForm.comments);
		sessionStorage.setItem("numberBrisboxers",orderForm.numberBrisboxers);
		sessionStorage.setItem("hours",orderForm.hours);
		sessionStorage.setItem("startMoment",orderForm.startMoment);
		sessionStorage.setItem("day",orderForm.day);
		sessionStorage.setItem("name",orderForm.name);
		sessionStorage.setItem("surname",orderForm.surname);
		sessionStorage.setItem("phone",orderForm.phone);
		sessionStorage.setItem("email",orderForm.email);
		Router.go("order-checkout");
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
