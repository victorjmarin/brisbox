Template.listAllOrders.helpers({
    orders: function () {
        var user_id = Meteor.userId();
        return Orders.find({
            $where: "this.brisboxers.length < this.numberBrisboxers",
            "brisboxers._id": {$ne: user_id},
            "canceled": {$ne: true}
        });
    }
});