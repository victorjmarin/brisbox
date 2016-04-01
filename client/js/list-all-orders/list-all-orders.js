Meteor.subscribe("ordersAvailable");

Template.listAllOrders.helpers({
    orders: function(){
    	return Orders.find();
    }
});