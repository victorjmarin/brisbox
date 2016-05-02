/**
 * Created by Antonio on 06/04/2016.
 */

Template.order_dashboard.helpers({
    notInOrder: function(){
        var brisboxers = this.brisboxers;
        var brisboxersIds = _.pluck(brisboxers, "_id");
        var result = !_.contains(brisboxersIds, Meteor.userId());
        return result;
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
    calculateCost: function (numBrisboxers, hours) {
        return numBrisboxers * hours * 20 + " €";
    },
    notEmpty: function (brisboxers) {
        return brisboxers.length>0
    },
    replaceSpace: function (string) {
        return string.split(' ').join('+');
    },
    prettifyDate: function (date) {
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        var curr_year = date.getFullYear();
        result = curr_date + "/" + curr_month + "/" + curr_year;
        return result;
    }
});

Template.order_dashboard.events({
    'click #confirm-order-payment': function(e){
        Session.set('showPaymentConfirmationModal', true);
    }
});

Template.order_dashboard.onRendered(function () {
    GoogleMaps.load({
        key: 'AIzaSyAfk4ikNH05OssyWavDvWImWFsf6oVXzzQ'
    });
});

Template.registerHelper("orderDay", function (date) {
    var hoy = new Date();
    var diaPedidoSub1 = new Date();
    diaPedidoSub1.setTime(date.getTime());
    return hoy.getTime()-diaPedidoSub1.getTime()>0;
});
Template.registerHelper("orderCancel", function (date) {
    var hoy = new Date();
    var diaPedidoSub12H = new Date();
    diaPedidoSub12H.setTime(date.getTime() - 43200000);
    return hoy.getTime()-diaPedidoSub12H.getTime()<0;
});
Template.order_dashboard.events({
    'click #cancel': function (event) {
        Router.go('cancel-order', {
            ord: Base64.encode(this._id),
            token: ((parseInt(this.phone) * 71) + (parseInt(this.zip) * 31))
        });
    },
    'click #edit-order': function(e){
        Router.go('edit-order', {
            ord: Base64.encode(this._id)
        });
    }
});

Template.order_dashboard.onCreated(function () {
    var data = this.data;
    GoogleMaps.ready("dashmap", function (map) {
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
