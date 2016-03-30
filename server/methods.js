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
                future.throw(new Meteor.Error(err.statusCode , err.code));
            }else{
                future.return(charge);
            }
        });

        return future.wait();
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
    },
    'createBrisboxer': function(doc) {

        check(doc, SchemaInscription);
        var user = Accounts.createUser( {username: doc.username, password: doc.password, email: doc.email,
            profile: {
                name: doc.name,
                surname: doc.surname,
                phone: doc.phone,
                zip: doc.zip,
                emailSchool: doc.emailSchool,
                howHearAboutUs: doc.howHearAboutUs
            } });
        Roles.addUsersToRoles(user, ['brisboxer']);
    }

});