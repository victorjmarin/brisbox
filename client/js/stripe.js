/**
 * Created by Antonio on 15/03/2016.
 */
Template.stripe_form.onRendered(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);




});

Template.stripe_form.events({
    'submit #payment-form': function(e) {
        e.preventDefault();

        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();
        amountForm = $('#amount').val();

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function(status, response) {
            stripeToken = response.id;
            Meteor.call('chargeCard', stripeToken, amountForm);
        });
    }
});