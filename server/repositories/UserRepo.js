UserRepo = {
    findFirstIn: function (userIds, sortCriteria) {
        return Meteor.users.find(
            {
                _id: {$in: userIds}
            },
            {
                sort: sortCriteria,
                limit: 1
            }
        ).fetch()[0];
    }
};