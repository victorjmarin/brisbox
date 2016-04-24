OrderService = {
    selectCaptain: function (order) {
        var brisboxersIds = _.pluck(order.brisboxers, "_id");
        var result = UserRepo.findFirstIn(brisboxersIds, {completedOrders: -1});
        return result;
    },
    needsMoreBrisboxers: function (order) {
        return order.numberBrisboxers > order.brisboxers.length;
    },
    alreadyInOrder: function (order, brisboxer) {
        var dbOrder = OrderRepo.findOne(order);
        var brisboxersIds = _.pluck(dbOrder.brisboxers, "_id");
        return _.contains(brisboxersIds, brisboxer._id);
    },
    joinOrder: function (order, brisboxer) {
        var result = order;
        if (!UserService.isAccepted(brisboxer) || !this.needsMoreBrisboxers(order) || this.alreadyInOrder(order, brisboxer)) {
            throw new Meteor.Error("BusinessRuleError");
        }
        result = OrderRepo.addBrisboxer(order, brisboxer);
        return result;
    }
};