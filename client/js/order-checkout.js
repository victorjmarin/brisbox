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
        return Session.get("orderForm");
    },
    cost: function() {
        var order = Session.get("orderForm");
        return order.numberBrisboxers * order.hours * 20 + " €";
    }
});

Template.orderCheckout.onRendered(function() {
    var addressLoading = Session.get("orderForm").addressLoading;
    var addressUnloading = Session.get("orderForm").addressUnloading;
    if(addressLoading!=null){
        $('.checkout-loading').css('visibility','visible');
    }
    if(addressUnloading!=null){
        $('.checkout-unloading').css('visibility','visible');
    }
});


