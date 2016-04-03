Meteor.subscribe("myOrders");

Template.listMyOrders.helpers({
    orders: function(){
    	return Orders.find();
    }
});