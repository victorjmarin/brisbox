Template.orderGridItem.helpers({
    left: function () {
        return this.numberBrisboxers - this.brisboxers.length;
    },
    dateFormat: function () {
        var locale = TAPi18n.getLanguage();
        return moment(this.date).locale(locale).format('L');
    },
    timeFormat: function () {
        return this.startMoment;
    },
    estimatedEarnings: function () {
        return this.hours * 10;
    },
    mapOptions: function () {
        if (GoogleMaps.loaded()) {
            return {
                disableDefaultUI: true,
                center: new google.maps.LatLng(37.3914105564361, -5.9591776906),
                zoom: 12
            };
        }
    }
});

Template.orderGridItem.events({
    'click .join': function (event) {
        Meteor.call("joinOrder", this);
    }
});

Template.orderGridItem.onRendered(function () {
    GoogleMaps.load({
        key: 'AIzaSyAfk4ikNH05OssyWavDvWImWFsf6oVXzzQ'
    });
});

Template.orderGridItem.onCreated(function () {
    GoogleMaps.ready('map', function (map) {
        var geocoder = new google.maps.Geocoder();
        var address = "Madrid";
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var latLng = new google.maps.LatLng(latitude, longitude);
                map.instance.setCenter(latLng);
            }
        });
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});