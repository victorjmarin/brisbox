Template.listAllOrders.helpers({
    orders: function() {
        var user_id = this.userId;
        if(!user_id){
            user_id = -1;
        }
    	return Orders.find({
            $where: "this.brisboxers.length < this.numberBrisboxers",
            "brisboxers._id": {$not: {$eq: user_id}}});
    }
});