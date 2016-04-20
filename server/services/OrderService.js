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
        if (UserService.isAccepted(brisboxer)) {
            if (this.needsMoreBrisboxers(order)) {
                var updatedOrder = OrderRepo.addBrisboxer(order, brisboxer);
                if (!this.needsMoreBrisboxers(updatedOrder)) {
                    var captain = this.selectCaptain(updatedOrder);
                    MailService.notifyCaptain(captain);
                }
            }
        }
    }
};