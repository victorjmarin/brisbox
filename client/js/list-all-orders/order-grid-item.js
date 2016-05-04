Template.orderGridItem.helpers({
    left: function () {
        return this.numberBrisboxers - this.brisboxers.length;
    },
    dateFormat: function () {
        var locale = TAPi18n.getLanguage();
        return moment(this.day).locale(locale).format('L');
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
                zoom: 17
            };
        }
    },
    comments: function () {
        var result = !this.comments ? TAPi18n.__("no_comments") : this.comments;
        return result;
    },
    address: function () {
        var result = this.addressLoading;
        if (!result) {
            result = this.addressUnloading;
        }
        return result;
    },
    loadUnloadText: function () {
        var result = "loading";
        var loading = this.addressLoading;
        if (!loading) {
            result = "unloading";
        }
        return result;
    },
    render: function () {
        return Session.get("render");
    }
});

Template.orderGridItem.events({
    'click .join': function (event) {
        Meteor.call("joinOrder", this, function (err) {
            if (!err) {
                Materialize.toast("<b>" + TAPi18n.__("orders_join") + "</b>", 2700);
            }
        });
    }
});

Template.orderGridItem.onRendered(function () {
    Session.set("render", false);
    GoogleMaps.load({
        key: 'AIzaSyAfk4ikNH05OssyWavDvWImWFsf6oVXzzQ'
    });
    setTimeout(function () {
        Session.set("render", true);
    }, 1);
});

Template.orderGridItem.onCreated(function () {
    var data = this.data;
    GoogleMaps.ready(data._id, function (map) {
        var geocoder = new google.maps.Geocoder();
        var address = data.addressLoading + " " + data.zip;
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var latLng = new google.maps.LatLng(latitude, longitude);
                map.instance.setCenter(latLng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map.instance
                });
            }
        });
    });
});