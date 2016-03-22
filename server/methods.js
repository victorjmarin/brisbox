Meteor.methods({
    'chargeCard': function (stripeToken, amountForm) {
        var stripeKey = Meteor.settings.private.stripe.testSecretKey;
        var Stripe = StripeAPI(stripeKey);

        Stripe.charges.create({
            amount: amountForm,
            currency: 'eur',
            source: stripeToken
        }, function (err, charge) {
            console.log(err, charge);
        });
    },
    'changeAcceptedStatus': function(brisbox_id, accepted){
        Meteor.users.update(brisbox_id, {
            $set: {accepted: accepted}
        });
    },

    'sendEmailToBrisbox': function (correo, subject, text) {
        this.unblock();
        console.log("*** sendEmailToBrisbox ***");
        Email.send({
            from: 'hello@brisbox.com',
            subject: "[" + correo + "] " + subject,
            text: "[" + correo + "] "+text,
            to: 'hello@brisbox.com'
        });
    },
    'sendEmailToUser': function (correo, subject, text) {
        this.unblock();
        console.log("*** sendEmailToUser ***");
        Email.send({
            from: 'hello@brisbox.com',
            subject: subject,
            text: text,
            to: correo
        });
    }
});
