OrderRepo = {
    addBrisboxer: function (order, brisboxer) {
        Orders.update(
            {
                _id: order._id
            },
            {
                $push: {
                    brisboxers: {_id: brisboxer._id, username: brisboxer.username}
                }
            });
        return Orders.findOne(order._id);
    }
};