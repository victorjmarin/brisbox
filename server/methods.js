var Future = Npm.require('fibers/future');

Meteor.methods({
    'chargeCard': function (stripeToken, amountForm) {
        var stripeKey = 'sk_test_u6R8UmdlKfuIUYvpVWuWOkEx';
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
        console.log("*** sendEmailToUser ***");
        Email.send({
            from: 'hello@brisbox.com',
            subject: subject,
            text: text,
            to: correo
        });
    },

    'saveOrder': function (addressLoading, addressUnloading, portalLoading, portalUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                           startMoment, day, name, surname, phone, email) {
        var orderForm = {
            addressLoading: addressLoading,
            addressUnloading: addressUnloading,
            portalLoading: portalLoading,
            portalUnloading: portalUnloading,
            zip: zip,
            loading: loading,
            unloading: unloading,
            comments: comments,
            numberBrisboxers: numberBrisboxers,
            hours: hours,
            startMoment: startMoment,
            day: day,
            name: name,
            surname: surname,
            phone: phone,
            email: email,
            canceled: false,
            brisboxers: []
        };
        Orders.insert(orderForm, function (err, callback) {
            if (!err) {
                Meteor.call('sendOrderCreatedEmail', callback);
            }
        });
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
        var outerMethod = this;
        Meteor.call('createBrisboxerNoRole', doc, function (err, userId) {
            if (err) { // TODO: Simulate transaction and delete inscription form
                console.log("error en server");
                console.log(err);
                throw new Meteor.Error("Server error", err);
            } else {
                Roles.addUsersToRoles(userId, ['brisboxer']);
                Meteor.users.update(userId, {
                    $set: {
                        verified: false,
                        assessments: []
                    }
                });
                outerMethod.unblock();
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

   'createBrisboxer': function (doc) {

       check(doc, SchemaInscription);
       var outerMethod = this;
       try{
           var userId = Accounts.createUser({
               username: doc.username, password: doc.password, email: doc.email,
               profile: {
                   name: doc.name,
                   surname: doc.surname,
                   phone: doc.phone,
                   zip: doc.zip,
                   howHearAboutUs: doc.howHearAboutUs
               }
           });
       } catch (error) {
           throw new Meteor.Error("Server error", error);
       }

       Roles.addUsersToRoles(userId, ['brisboxer']);
       Meteor.users.update(userId, {
           $set: {
               verified: false
           }
       });
       outerMethod.unblock();
       Accounts.sendVerificationEmail(userId);
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
    'sendOrderCreatedEmail': function (orderId) {
        var pedidoIdCodificado = Meteor.call('codificaString', orderId);
        var pedido = Orders.findOne({"_id":orderId});
        var token = (parseInt(pedido.phone) * 71) + (parseInt(pedido.zip) * 31);
        var urlDashboardOrder = process.env.ROOT_URL+ "order_dashboard/" + pedidoIdCodificado;
        var urlDeleteOrder = process.env.ROOT_URL + "cancel-order/" + pedidoIdCodificado + "/" + token;
        var currentLocale = TAPi18next.lng();
        if (currentLocale == "es") {
            var subject = "[BRISBOX] ¡Su pedido ha sido registrado!";
            var text = "Hola " + pedido.name + " su pedido ha sido registrado en el sistema.\nPulse en el siguiente enlace para acceder al estado actual de su pedido:\n" + urlDashboardOrder + " \n\nSi desea cancelar el pedido sólo tiene que hacer click en el siguiente enlace:\n" + urlDeleteOrder + "\n\n Un saludo del equipo de Brisbox.";
        }
        if (currentLocale == "en") {
            var subject = "[BRISBOX] Your order has been registered!";
            var text = "Hello " + pedido.name + " your order has been registered on the system.\nClick on the next link to see the actual status of your order:\n" + urlDashboardOrder + " \n\nIf you want to cancel your order, you just have to click on the next link:\n" + urlDeleteOrder + "\n\n Greetings for the Brisbox Team.";
        }
        Meteor.call('sendEmailToUser', pedido.email, subject, text);
    },

    'deleteOrderMethod': function (orderIdCodificado, token) {
        var res = "NOTCANCELED";
        var orderIdDecodificado = Meteor.call('deCodificaString', orderIdCodificado);
        var order = Orders.findOne({"_id": orderIdDecodificado});
        var tokenInt = token * 1;
        if (Orders.find({"_id": orderIdDecodificado}).count() == 1) {
            if (order._id == orderIdDecodificado) {
                if ((parseInt(order.phone) * 71) + (parseInt(order.zip) * 31) == tokenInt) {
                    console.log("*** TOKEN CORRECTO ***");
                    Orders.update(orderIdDecodificado, {
                        $set: {
                            canceled: true
                        }
                    });
                    res = "CANCELED";
                } else {
                    res = "NOTCANCELED";
                }
            }
        } else {
            res = "NOTFOUND";
        }
        return res;
    },
    'codificaString': function (noCodificado) {
        var encodedString = Base64.encode(noCodificado);
        return encodedString;
    },
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'updateLastLeftOfBrisboxer': function (brisboxer_id) {
        if (Meteor.userId() === brisboxer_id) {
            Meteor.users.update({"_id" :brisboxer_id }, {
                    $set: {
                        "lastLeft": new Date()
                    }
                },
                {upsert:false,
                    multi:true});
        }
    },
    'updateBrisboxersOfOrder': function (order_id, brisboxers, brisboxer_id) {
        //TODO Hay que comprobar que se puede realizar
        Orders.update(order_id, {
            $set: {
                brisboxers: brisboxers
            }
        });
    }

});