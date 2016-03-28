var Future = Npm.require( 'fibers/future' );

Meteor.methods({
    'chargeCard': function(stripeToken, amountForm) {
        var stripeKey = Meteor.settings.private.stripe.testSecretKey;
        var Stripe = StripeAPI(stripeKey);

        var future = new Future();

        Stripe.charges.create({
            amount: amountForm,
            currency: 'eur',
            source: stripeToken
        },function(err, charge){
            if(err){
                future.return(err);
            }else{
                future.return(charge);
            }
        });

        return future.wait();
    }
});