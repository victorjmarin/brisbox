Template.listMyOrders.helpers({
    orders: function(){
    	var user_id = Meteor.user()._id;
    	return Orders.find({"brisboxers._id": user_id});
    }
});