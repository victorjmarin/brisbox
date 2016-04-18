/**
 * Created by Antonio on 18/04/2016.
 */
Template.brisboxers_list.helpers({
    'isThisBrisboxer': function(id){
        return Meteor.userId() === id
    }
});
Template.brisboxers_list.events({
    'click .clear-icon': function (e){
        e.preventDefault();

        var id = e.currentTarget.getAttribute('data-id');
        var order_id = Session.get('order_id');
        var order = Orders.findOne({_id: order_id});
        var brisboxers = order.brisboxers;
        var index = null;
        for (i = 0; i < brisboxers.length; i++) {
            var entry = brisboxers[i];
            if(Meteor.userId() === id && entry._id === id){
                index = brisboxers.indexOf(entry);
                break;
            }
        }
        if (index > -1) {
            brisboxers.splice(index, 1);
        }

       // Meteor.call('updateBrisboxersOfOrder', order_id, brisboxers, function(err, res){
       //     if(res){
       //         Materialize.toast(TAPi18n.__('order_dashboard_left'), 4000) // 4000 is the duration of the toast
       //     }
       // });

       Meteor.call('updateLastLeftOfBrisboxer', Meteor.userId());
    }
});