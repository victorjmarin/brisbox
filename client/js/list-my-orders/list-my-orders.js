Template.listMyOrders.helpers({
    orders: function(){
    	return Orders.find({name: "testAlpha"});
    }
});