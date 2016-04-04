var Future = Npm.require('fibers/future');

Meteor.methods({
    'chargeCard': function (stripeToken, amountForm) {
        var stripeKey = Meteor.settings.private.stripe.testSecretKey;
        var Stripe = StripeAPI(stripeKey);

        var future = new Future();

        Stripe.charges.create({
            amount: amountForm,
            currency: 'eur',
            source: stripeToken
        }, function (err, charge) {
            if (err) {
                future.throw(new Meteor.Error(err.statusCode, err.code));
            } else {
                future.return(charge);
            }
        });

        return future.wait();
    },
    'changeAcceptedStatus': function (brisbox_id, accepted) {
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
            text: "[" + correo + "] " + text,
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

    'saveOrder': function (orderForm) {
        Orders.insert(orderForm);
    },

    'createBrisboxer': function (doc) {
        check(doc, SchemaInscription);
        Meteor.call('createBrisboxerNoRole', doc, function (err, userId) {
            if (err) { // TODO: Simulate transaction and delete inscription form
                console.log(err);
            } else {
                Roles.addUsersToRoles(userId, ['brisboxer']);
                Meteor.users.update(userId, {
                    $set: {
                        verified: false,
                    }
                });
                Accounts.sendVerificationEmail(userId);
            }
        });

    },

    'createBrisboxerNoRole': function (doc) {
        return Accounts.createUser({
            username: doc.username, password: doc.password, email: doc.email,
            profile: {
                name: doc.name,
                surname: doc.surname,
                phone: doc.phone,
                zip: doc.zip,
                contactEmail: doc.contactEmail,
                howHearAboutUs: doc.howHearAboutUs
            }
        });

    },

    'joinOrder': function (order) {
        var user = Meteor.user();
        if (Roles.userIsInRole(user._id, ['brisboxer']) && user.accepted) {
            if (order.numberBrisboxers > order.brisboxers.length) {
                Orders.update({_id: order._id}, {$push: {brisboxers: {_id: user._id, username: user.username}}});
            }
        }
    },

    'verificaEmailDesdeCorreo': function(){
        Meteor.users.update(Meteor.userId(), {
        $set: {
            verified: true
        }
    });
    },

    'sendEmail': function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    },

    'getAllZips':function(){
       return Zips.findAll();
    }
});