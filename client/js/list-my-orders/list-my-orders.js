Template.listMyOrders.helpers({
    orders: function () {
        var user_id = Meteor.userId();
        return Orders.find({"brisboxers._id": user_id, "canceled": {$ne: true}});
    }
});