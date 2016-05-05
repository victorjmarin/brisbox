/**
 * Created by Antonio on 23/04/2016.
 */
Template.payment_confirmation.onRendered(function(){
    $('#payment-access').addClass('payment-open');
    $('#payment-overlay').css('display', 'block');
    $('#payment-main').css('display', 'block');
    $('#payment-access').css('display', 'block');
    $('#payment-form').removeClass("payment-hidden");

    $('#payment-content').delay(150).slideDown("slow");
    Session.set("finalCost", 0);
    Session.set("cost", 0);
    Session.set("step1", false);
});

Template.payment_confirmation.events({
    'change #real_num_brisboxers': function(e){
        updateCost()
    },
    'change #real_num_hours': function(e){
        updateCost()
    },'keyup #real_num_brisboxers': function(e){
        updateCost()
    },
    'keyup #real_num_hours': function(e){
        updateCost()
    },
    'click #confirmation_button':function(e){
        var brisboxers = $('#real_num_brisboxers').val();
        var hours = $('#real_num_hours').val();
        if(Session.get('finalCost') > 0 || brisboxers < 0 || hours < 0){
            $('#payment-form').addClass("payment-hidden");
            Session.set("step1", true);
            Session.set("enableStripeForm", true);
            Session.set("isCreation", false);
        }
    },
    'click #cancel_button':function(e){
        closeModal();
    },
    'click #payment-overlay': function(e){
        closeModal();
    }
});

function closeModal(){
    $('#payment-form').removeClass("payment-hidden");
    Session.set("step1", false);
    Session.set("enableStripeForm", false);
    Session.set("isCreation", false);
    Session.set('showPaymentConfirmationModal', false);
}

function updateCost(){
    var brisboxers = $('#real_num_brisboxers').val();
    var hours = $('#real_num_hours').val();

    var cost = brisboxers * hours * 20;

    if(!cost || cost < 0){
        cost = 0;
    }
    var booking = Meteor.settings.public.reserveAmount/100;
    var finalCost = cost - discount - booking;

    if(!finalCost || finalCost < 0){
        finalCost = 0;
    }
    Session.set("cost", cost);
    Session.set("finalCost", finalCost);
}

Template.payment_confirmation.helpers({
    'cost': function(){
        return Session.get('cost');
    },
    'discount': function(){
        return discount;
    },
    'hasDiscount': function(){
        return discount && discount > 0;
    },
    'finalCost': function(){
        return Session.get('finalCost');
    },
    'step1': function(){
        return Session.get('step1');
    },
    booking: function(){
        return Meteor.settings.public.reserveAmount/100;
    }
});