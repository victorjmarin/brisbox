/**
 * Created by Antonio on 15/03/2016.
 */
Template.stripe_form.onRendered(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);

    Session.set("stripe_error", null);
});

Template.stripe_form.helpers({
    stripe_error: function() {
        return Session.get("stripe_error");
    }
});

Template.stripe_form.events({
    'submit #payment-form': function(e) {
        e.preventDefault();

        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();
        amountForm = $('#amount').val();

        Session.set("stripe_error", null);

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function(status, response) {

            if(amountForm < 50){
                var code = "invalid_amount";
                Session.set("stripe_error", code);
            }else if(status != 200){
                var code = response.error.code;
                Session.set("stripe_error", code);
            }else {
                stripeToken = response.id;
                Meteor.call('chargeCard', stripeToken, amountForm, function(error, succeed){
                    if(error){
                        console.log(error);
                    }else {
                        var status = succeed.statusCode;
                        if(status == null){
                            status = succeed.status;
                        }
                            if(status != "succeeded"){
                                var code = succeed.raw.code;
                                Session.set("stripe_error", code);
                            }else {
                                alert("El pago se ha realizado correctamente.");
                            }
                    }
                });
            }
        });
    }
});