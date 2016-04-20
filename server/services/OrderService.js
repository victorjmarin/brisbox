OrderService = {
    selectCaptain: function (order) {
        var brisboxersIds = _.pluck(order.brisboxers, "_id");
        var result = UserRepo.findFirstIn(brisboxersIds, {completedOrders: -1});
        return result;
    },
    needsMoreBrisboxers: function (order) {
        return order.numberBrisboxers > order.brisboxers.length;
    },
    joinOrder: function (order, brisboxer) {
        var result = order;
        if (!UserService.isAccepted(brisboxer) || !this.needsMoreBrisboxers(order)) {
            throw new Meteor.Error("notAcceptedOrFullOrder");
        }
        result = OrderRepo.addBrisboxer(order, brisboxer);
        return result;
    }
};