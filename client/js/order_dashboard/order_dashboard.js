/**
 * Created by Antonio on 06/04/2016.
 */
Template.registerHelper("prettifyDate", function(date) {
    var result = "";
    if(date) {
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        var curr_year = date.getFullYear();
        result = curr_date + "/" + curr_month + "/" + curr_year;
    }
    return result;
});

Template.registerHelper("calculateCost", function(numBrisboxers, hours) {
    return numBrisboxers * hours * 20 + " €";
});

Template.order_dashboard.helpers({
    'notInOrder': function(){
        var brisboxers = this.brisboxers;
        var brisboxersIds = _.pluck(brisboxers, "_id");
        var result = !_.contains(brisboxersIds, Meteor.userId());
        return result;
    }
});

Template.order_dashboard.events({
    'click .confirm-payment': function(e){
        Session.set('showPaymentConfirmationModal', true);
    }
});