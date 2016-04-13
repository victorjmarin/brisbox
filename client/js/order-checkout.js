Template.orderCheckout.events({
    'click #showStripeModal': function(){
        Session.set('showStripeModal', true);
    },
    'click #buttom-next': function(event){
        Session.set("enableStripeForm", true);
    }
});

Template.orderCheckout.helpers({
    day: function(){
        return sessionStorage.getItem("day");
    },
    phone: function(){
        return sessionStorage.getItem("phone");
    },
    addressLoading: function(){
        return sessionStorage.getItem("addressLoading");
    },
    addressUnloading: function(){
        return sessionStorage.getItem("addressUnloading");
    },
    cost: function() {
        return sessionStorage.getItem("numberBrisboxers") * sessionStorage.getItem("hours") * 20 + " €";
    }
});

Template.orderCheckout.onRendered(function() {
    var addressLoading = sessionStorage.getItem("addressLoading");
    var addressUnloading = sessionStorage.getItem("addressUnloading");
    console.log(addressLoading);
    if(addressLoading!=null){
        $('.checkout-loading').css('visibility','visible');
    }
    if(addressUnloading!=null){
        $('.checkout-unloading').css('visibility','visible');
    }
});


