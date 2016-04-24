OrderRepo = {
    findOne: function (order) {
        return Orders.findOne(order._id);
    },
    addBrisboxer: function (order, brisboxer) {
        Orders.update(
            {
                _id: order._id
            },
            {
                $push: {
                    brisboxers: {_id: brisboxer._id, username: brisboxer.username, assessed: false}
                }
            });
        return Orders.findOne(order._id);
    }
};