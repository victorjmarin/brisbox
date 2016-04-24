UserService = {
    principal: function () {
        return Meteor.user();
    },
    isBrisboxer: function (user) {
        var result = Roles.userIsInRole(user._id, ['brisboxer']);
        return result;
    },
    isAccepted: function(user) {
        return user.accepted && this.isBrisboxer(user);
    }
}