/**
 * Created by Antonio on 18/04/2016.
 */
Template.brisboxers_list.helpers({
    'isThisBrisboxer': function(id){
        return Meteor.userId() === id;
    },
    imageProfile: function(id) {
        var user = Meteor.users.findOne(id);
        if (user.profile.image != null){
            return "/cfs/files/images/".concat(user.profile.image);
        } else {
            return "/placeholder.png";
        }
    },
    score: function(id) {
        var user = Meteor.users.findOne(id);
        var assessments = user.assessments;
        var res = 0.0;
        for(var x in assessments){
            res += assessments[x].rating;
        }
        res = res / assessments.length;
        res = Math.round(res*100) / 100;
        if(isNaN(res)){
            res="N/A";
        }
        return res;
    }
});
Template.brisboxers_list.events({
    'click #leave-order': function (e){
        e.preventDefault();

        var id = e.currentTarget.getAttribute('data-id');
        var order_id = Session.get('order_id');

       Meteor.call('updateBrisboxersOfOrder', order_id, id, function(err, res){
           if(res){
               Materialize.toast(TAPi18n.__('order_dashboard_left'), 4000) // 4000 is the duration of the toast
           }
       });

       Meteor.call('updateLastLeftOfBrisboxer', Meteor.userId());
    },
    'click #briboxerGo':function (e){
        var id = e.currentTarget.getAttribute('data-id');
        Router.go('brisboxerDetails', {_id:id});
    }
});
