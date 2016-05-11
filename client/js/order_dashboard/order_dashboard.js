Meteor.subscribe("extra_hoursAll");

Template.order_dashboard.helpers({
    notInOrder: function () {
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
        return numBrisboxers * hours * 20 + "€";
    },
    notEmpty: function (brisboxers) {
        return brisboxers.length > 0
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
    },
    notPaid: function () {
        return this.paidDate == null;
    },
    status: function () {
        var result = "order_dashboard_status_searching_birsboxers";
        if (this.canceled) {
            result = "order_dashboard_status_canceled";
        } else if (this.paidDate != null) {
            result = "order_dashboard_status_paid";
        } else if (this.brisboxers.length === this.numberBrisboxers) {
            result = "order_dashboard_status_prepared";
        }
        return result;
    },
    extra_hours: function () {
        var order_id = this._id;
        var extra_hoursResult = ExtraHours.find({orderId: order_id, accepted: "accepted"}).fetch();
        return calculateExtraHours(extra_hoursResult);
    },
    canAddHours: function (){
        var order_id = this._id;
        var extra_hoursResult = ExtraHours.find({orderId: order_id, accepted: "pending"}).fetch();
        return extra_hoursResult.length == 0;
    },
    isCustomerVerified: function() {
        return Session.get("cancelcodelogin")
    },
    orderFull: function () {
        return this.brisboxers.length === this.numberBrisboxers;
    }
});

Template.order_dashboard.events({
    'click .confirm-payment': function (e) {
        Session.set('showPaymentConfirmationModal', true);
    },
    'submit .confirm-extra_hours': function (e) {
        e.preventDefault();
        var extra_hours = document.getElementById('extraHours').value;
        var order = Orders.findOne({_id: Session.get("order_id")});
        var extra_hoursForm = {
            extra_hours: parseInt(extra_hours),
            orderId: order._id,
            accepted: "pending"
        };
        Meteor.call("createExtraHours", extra_hoursForm);
    },
    'click #cancel': function (event) {
        Router.go('cancel-order', {
            ord: Base64.encode(this._id),
            token: ((parseInt(this.phone) * 71) + (parseInt(this.zip) * 31))
        });
    }
});

Template.order_dashboard.onRendered(function () {
    GoogleMaps.load({
        key: 'AIzaSyAfk4ikNH05OssyWavDvWImWFsf6oVXzzQ'
    });
    discount = 0;
    var order = Orders.findOne({_id: Session.get("order_id")});
    if (order.discount) {
        discount = order.discount / 100;
    }
});

Template.registerHelper("orderDay", function (date) {
    var hoy = new Date();
    var diaPedidoSub1 = new Date();
    diaPedidoSub1.setTime(date.getTime());
    return hoy.getTime() - diaPedidoSub1.getTime() > 0;
});
Template.registerHelper("orderCancel", function (date) {
    var hoy = new Date();
    var diaPedidoSub24H = new Date();
    diaPedidoSub24H.setTime(date.getTime() - 86400000);
    return hoy.getTime() - diaPedidoSub24H.getTime() < 0;
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

function calculateExtraHours(extra_hours){
    var res = 0;
    for(var i = 0; i<extra_hours.length;i++){
        console.log(extra_hours[i]);
        res = res + extra_hours[i].extra_hours;
    }
    return res;
}