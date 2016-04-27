Template.orderCheckout.events({
    'click #showStripeModal': function () {
        Session.set('showStripeModal', true);
        Session.set("isCreation", true);
    },
    'click #buttom-next': function (event) {
        $('#buttom-next').attr('disabled',true);
        $('#stripe-submit').attr('disabled',false);
        Session.set("enableStripeForm", true);
        Session.set("isCreation", true);
    }
});

Template.orderCheckout.helpers({
    day: function () {
        return sessionStorage.getItem("day-order-checkout");
    },
    phone: function () {
        return sessionStorage.getItem("phone");
    },
    addressLoading: function () {
        return sessionStorage.getItem("addressLoading");
    },
    addressUnloading: function () {
        return sessionStorage.getItem("addressUnloading");
    },
    cost: function () {
        return sessionStorage.getItem("numberBrisboxers") * sessionStorage.getItem("hours") * 20 + " €";
    }
});

Template.orderCheckout.onRendered(function () {
    var addressLoading = sessionStorage.getItem("addressLoading");
    var addressUnloading = sessionStorage.getItem("addressUnloading");
    if (addressLoading != null) {
        $('.checkout-loading').css('visibility', 'visible');
    }
    if (addressUnloading != null) {
        $('.checkout-unloading').css('visibility', 'visible');
    }
    $('#stripe-submit').attr('disabled',true);
    Session.set("isCreation", true);
});


