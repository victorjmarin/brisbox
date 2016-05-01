UserService = {
    principal: function () {
        return Meteor.user();
    },
    isBrisboxer: function (user) {
        var result = Roles.userIsInRole(user._id, ['brisboxer']);
        return result;
    },
    isAccepted: function (user) {
        return user.accepted && this.isBrisboxer(user);
    },
    brisboxerEmails: function (order) {
        var brisboxerIds = _.pluck(order.brisboxers, "_id");
        var brisboxers = UserRepo.findIn(brisboxerIds);
        var result = _.map(brisboxers, function (brisboxer) {
            return brisboxer.emails[0].address;
        });
        return result;
    }
}