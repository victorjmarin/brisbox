Meteor.methods({
    'chargeCard': function(stripeToken, amountForm) {
        var stripeKey = Meteor.settings.private.stripe.testSecretKey;
        var Stripe = StripeAPI(stripeKey);

        Stripe.charges.create({
            amount: amountForm,
            currency: 'eur',
            source: stripeToken
        }, function(err, charge) {
            console.log(err, charge);
        });
    },
    'changeAcceptedStatus': function(brisbox_id, accepted){
        Meteor.users.update(brisbox_id, {
            $set: {accepted: accepted}
        });
    }
});
