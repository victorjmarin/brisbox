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

    'prueba': function (text) {
        console.log(text);
    },

    'sendEmail': function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        console.log(process.env.MAIL_URL);

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

    'createBrisboxer': function (doc) {
        check(doc, SchemaInscription);
        Meteor.call('createBrisboxerNoRole', doc, function (err, userId) {
            if (err) { // TODO: Simulate transaction and delete inscription form
                console.log(err);
            } else {
                Roles.addUsersToRoles(userId, ['brisboxer']);
                Meteor.users.update(userId, {
                    $set: {
                        verified: false
                    }
                });
                this.unblock();
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

    'verificaEmailDesdeCorreo': function () {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                verified: true
            }
        });
    },
    'sendOrderCreatedEmail': function (correo, orderId) {
        this.unblock();
        var pedido = Orders.get(orderId);
        var user = Meteor.users.findUserByEmail(correo);
        var pedidoIdCodificado = pedido._id * 31;
        var token = (pedido.phone * 71) + (pedido.zip * 31);
        var urlDashboardOrder = Router.current().route.path() + "/order_dashboard/" + pedidoIdCodificado
        var urlDeleteOrder = Router.current().route.path() + "/cancel-order/" + pedidoIdCodificado + "/" + token;
        var currentLocale = TAPi18next.lng();
        if (currentLocale == "es") {
            var subject = "[BRISBOX] ¡Su pedido ha sido registrado!";
            var text = "Hola " + user.name + " su pedido ha sido registrado en el sistema.\nPulse en el siguiente enlace para acceder al estado actual de su pedido:\n" + urlDashboardOrder + " \n\nSi desea cancelar el pedido sólo tiene que hacer click en el siguiente enlace:\n" + urlDeleteOrder + "\n\n Un saludo del equipo de Brisbox.";
        }
        if (currentLocale == "en") {
            var subject = "[BRISBOX] Your order has been registered!";
            var text = "Hello " + user.name + " your order has been registered on the system.\nClick on the next link to see the actual status of your order:\n" + urlDashboardOrder + " \n\nIf you want to cancel your order, you just have to click on the next link:\n" + urlDeleteOrder + "\n\n Greetings for the Brisbox Team.";
        }
        console.log("*** sendOrderCreatedEmail ***");
        Email.send({
            from: 'hello@brisbox.com',
            subject: subject,
            text: text,
            to: correo
        });
    },

    'deleteOrderMethod': function (orderId, token) {
        var res = "NOTCANCELED";
        var orderIdDecodificado = (orderId*1)/31;
        var order = Orders.find(orderIdDecodificado);
        var tokenInt = token * 1;
        if (order._id == orderIdDecodificado) {
            console.log("*** PEDIDO ENCONTRADO ***");
            if ((order[0].phone * 71) + (order[0].zip * 31) == tokenInt) {
                console.log("*** TOKEN CORRECTO ***");
                Orders.update(orderIdDecodificado, {
                    $set: {
                        canceled: true
                    }
                });
                Orders.delete(orderIdDecodificado);
                res = "CANCELED";
            }
        }else{
            console.log("*** PEDIDO NO ENCONTRADO ***");
            res = "NOTFOUND";
        }
        return res;
    }
});