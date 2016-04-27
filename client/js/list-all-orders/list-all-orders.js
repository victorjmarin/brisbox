Template.listAllOrders.helpers({
    orders: function () {
        var user_id = Meteor.userId();
        orders = Orders.find({
            $where: "this.brisboxers.length < this.numberBrisboxers",
            "brisboxers._id": {$ne: user_id}
        }, {sort: {hours: -1}});
        return orders;
    }
});