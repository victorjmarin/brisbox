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

Template.orderCheckout.events({
    'click #showStripeModal': function(){
        Session.set('showStripeModal', true);
    },
    'click #buttom-next': function(event){
        Session.set("enableStripeForm", true);
    }
});

Template.orderCheckout.helpers({
    order: function(){
        return Session.get("order");
    },
    cost: function() {
        var order = Session.get("order");
        return order.numberBrisboxers * order.hours * 20 + " €";
    },
});

Template.orderCheckout.onRendered(function() {
    var addressLoading = getParameterByName("addressLoading");
    var addressUnloading = getParameterByName("addressUnloading");
    var zip = getParameterByName("zip");
    var loading = getParameterByName("loading");
    var comments = getParameterByName("comments");
    var numberBrisboxers = getParameterByName("numberBrisboxers");
    var unloading = getParameterByName("unloading");
    var hours = getParameterByName("hours");
    var day = getParameterByName("day");
    var name = getParameterByName("name");
    var surname = getParameterByName("surname");
    var phone = getParameterByName("phone");
    var email = getParameterByName("email");
    if(addressLoading!=null){
        $('.checkout-loading').css('visibility','visible');
    }
    if(addressUnloading!=null){
        $('.checkout-unloading').css('visibility','visible');
    }
    Session.set("order", {
        addressLoading: addressLoading,
        addressUnloading: addressUnloading,
        zip: zip,
        loading: loading,
        comments: comments,
        numberBrisboxers: numberBrisboxers,
        unloading: unloading,
        hours: hours,
        day: day,
        name: name,
        surname: surname,
        phone: phone,
        email: email
    });
});


