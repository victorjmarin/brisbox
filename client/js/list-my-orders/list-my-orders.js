Meteor.subscribe("paco");

Template.listMyOrders.helpers({
    orders: function(){
    	return Orders.find();
    }
});