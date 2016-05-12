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
        Email.send({
            from: 'hello@brisbox.com',
            subject: subject,
            text: text,
            to: correo
        });
    },

    'saveOrder': function (addressLoading, addressUnloading, portalLoading, portalUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                           startMoment, day, name, surname, phone, email, codePromotion, status) {
        var superCode = Random.hexString(6);
        var discount = 0;
        if (codePromotion && codePromotion.length != 0) {
            var codePromotionResult = Promotions.findOne({code: codePromotion});
            if (codePromotionResult != null) {
               discount = 500;
            }
        }
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
            superCode: superCode,
            canceled: false,
            brisboxers: [],
            discount:discount,
            status: status
        };
        Orders.insert(orderForm, function (err, orderId) {
            if (!err) {
                var order = Orders.findOne({"_id": orderId});
                MailService.orderRegistered(order, superCode);
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
        try {
            var userId = Accounts.createUser({
                username: doc.username, password: doc.password, email: doc.email,
                profile: {
                    name: doc.name,
                    surname: doc.surname,
                    phone: doc.phone,
                    zip: doc.zip,
                    howHearAboutUs: doc.howHearAboutUs,
                    image: doc.image
                }
            });
        } catch (error) {
            throw new Meteor.Error("Server error", error);
        }
        Roles.addUsersToRoles(userId, ['brisboxer']);
        Meteor.users.update(userId, {
            $set: {
                assessments: []
            }
        });
        outerMethod.unblock();
        Accounts.sendVerificationEmail(userId);
    },

    'createExtraHours': function (extra_hoursForm) {
        ExtraHours.insert(extra_hoursForm);

        //TODO:AQUI DEBERA ENVIARSE EL CORREO AL CAPITAN
    },

    'joinOrder': function (order) {
        var principal = UserService.principal();
        var updatedOrder = OrderService.joinOrder(order, principal);
        if (!OrderService.needsMoreBrisboxers(updatedOrder)) {
            var captain = OrderService.selectCaptain(updatedOrder);
            OrderService.setCaptain(updatedOrder, captain);
            Meteor.defer(function () {
                MailService.notifyCaptain(updatedOrder, captain);
                MailService.brisboxerComplete(updatedOrder);
            });
        }
    },

    'deleteOrderMethod': function (orderIdCodificado, token) {
        var res = "NOTCANCELED";
        var orderIdDecodificado = Meteor.call('deCodificaString', orderIdCodificado);
        var order = Orders.findOne({"_id": orderIdDecodificado});
        var tokenInt = token * 1;
        if (Orders.find({"_id": orderIdDecodificado}).count() == 1) {
            if (order._id == orderIdDecodificado) {
                if ((parseInt(order.phone) * 71) + (parseInt(order.zip) * 31) == tokenInt) {
                    res = "TOCANCEL";
                } else {
                    res = "NOTCANCELED";
                }
            }
        } else {
            res = "NOTFOUND";
        }
        return res;
    },

    'acceptExtraHoursController': function (extraHoursIdCodificado) {
        var res = "NOTFOUND";
        var extraHoursIdDecodificado = Base64.decode(extraHoursIdCodificado);
        var extraHours = ExtraHours.findOne({"_id": extraHoursIdDecodificado});
        if (ExtraHours.find({"_id":extraHoursIdDecodificado}).count() == 1) {
            if (extraHours.accepted == "pending"){
                res = "ACCEPT_EXTRA_HOURS";
            } else if (extraHours.accepted == "accepted" || extraHours.accepted == "rejected"){
                res = "ALREADY_CHOSED";
            }
        } else {
            res = "NOTFOUND";
        }
        return res;
    },

    'acceptExtraHours': function (extraHoursIdDecodificado) {
        var extraHours = ExtraHours.findOne({"_id": extraHoursIdDecodificado});
        ExtraHours.update(extraHoursIdDecodificado, {
            $set: {
                accepted: "accepted"
            }
        });
    },

    'rejectExtraHours': function (extraHoursIdDecodificado) {
        var extraHours = ExtraHours.findOne({"_id": extraHoursIdDecodificado});
        ExtraHours.update(extraHoursIdDecodificado, {
            $set: {
                accepted: "rejected"
            }
        });
    },

    'cancelOrder': function (orderIdCodificado, cancelationCode) {
        var res = false;
        var orderIdDecodificado = Meteor.call('deCodificaString', orderIdCodificado);
        var order = Orders.findOne({"_id": orderIdDecodificado});
        if (Orders.find({"_id": orderIdDecodificado}).count() == 1) {
            if (order.superCode == cancelationCode) {
                Orders.update(orderIdDecodificado, {
                    $set: {
                        canceled: true,
                        brisboxers: []
                    }
                });
                res = true;
                Meteor.defer(function () {
                    MailService.orderCanceled(order);
                });
            }
        }
        return res;
    },

    'codificaString': function (noCodificado) {
        var encodedString = Base64.encode(noCodificado);
        return encodedString;
    }
    ,
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'assessBrisboxer': function (orderId, brisboxerId, comments, rating) {
        var order = Orders.findOne({_id: orderId, "brisboxers._id": brisboxerId});
        var correct = false;
        for (var b in order.brisboxers) {
            if (order.brisboxers[b]._id == brisboxerId) {
                if (order.brisboxers[b].assessed) {
                    break;
                } else {
                    correct = true;
                    break;
                }
            }
        }
        if (correct) {
            Orders.update({_id: orderId, "brisboxers._id": brisboxerId}, {$set: {"brisboxers.$.assessed": true}});
            Meteor.users.update({_id: brisboxerId},
                {$push: {assessments: {comments: comments, rating: rating}}});
        }
    },
    'updateLastLeftOfBrisboxer': function (brisboxer_id) {
        if (Meteor.userId() === brisboxer_id) {
            var id = {'_id': brisboxer_id};
            var update = {
                '$set': {'profile.lastLeft': new Date()}
            };

            Meteor.users.update(brisboxer_id, update);
        }
    },
    'updateBrisboxersOfOrder': function (order_id, id) {
        if (id === Meteor.userId()) {
            var order = Orders.findOne({_id: order_id});
            if (!OrderService.needsMoreBrisboxers(order)) {
                Meteor.defer(function () {
                    MailService.brisboxerLeft(order);
                });
            }
            var brisboxers = order.brisboxers;
            var index = null;
            for (i = 0; i < brisboxers.length; i++) {
                var entry = brisboxers[i];
                if (Meteor.userId() === id && entry._id === id) {
                    index = brisboxers.indexOf(entry);
                    break;
                }
            }
            if (index > -1) {
                brisboxers.splice(index, 1);
            }
            return Orders.update(order_id, {
                $set: {
                    brisboxers: brisboxers
                }
            });

        }
    },
    'updateBrisboxerDetails': function (name, surname, phone) {
        var currentUserId = Meteor.userId();
        return Meteor.users.update(currentUserId, {
            $set: {
                "profile.name": name,
                "profile.surname": surname,
                "profile.phone": phone,
            }
        });

    },
    'updateOrdersCountToBrisboxersInOrder': function (order_id) {
        var order = Orders.findOne({_id: order_id});
        if (order) {
            var brisboxers = order.brisboxers;
            for (i = 0; i < brisboxers.length; i++) {
                var entry = brisboxers[i];
                var brisboxer = Meteor.users.findOne({_id: entry._id});
                if (brisboxer.profile.completedOrders != null) {
                    brisboxer.profile.completedOrders++;
                } else {
                    brisboxer.profile.completedOrders = 1;
                }
                Meteor.users.update(entry._id, {
                        $set: {
                            "profile.completedOrders": brisboxer.profile.completedOrders
                        }
                    },
                    {upsert: true}
                );
            }
            Orders.update({_id: order_id}, {$set: {"paidDate": new Date()}}, { upsert : true});
        }
    },
    'checkOrderCode': function (order_id, code) {
        var res = false;
        var order = Orders.findOne({"_id": order_id});
        if (Orders.find({"_id": order_id}).count() == 1) {
            if (order.superCode == code) {
                res = true;
            }
        }
        return res;
    },
    'editOrder': function(order_id, data){
        return Orders.update({_id: order_id}, {$set: data});
    },
    'monthly-stats': function (brisboxerId) {
        var orders = Orders.find({paidDate: {$exists: true}, "brisboxers._id": brisboxerId});
        var completedOrders = orders.count();
        var fetchedOrders = orders.fetch();
        var allBrisboxers = _.flatten(_.map(fetchedOrders, function (order) {
            _.map(order.brisboxers, function (b) {
                b.hours = order.hours
            })
            return order.brisboxers;
        }));
        var captaincies = _.filter(allBrisboxers, function (brisboxer) {
            return brisboxer._id == brisboxerId && brisboxer.captain == true;
        });
        var captainHours = _.reduce(captaincies, function (memo, cap) {
            return memo + cap.hours;
        }, 0);
        var normalHours = _.reduce(fetchedOrders, function (memo, order) {
                return memo + order.hours;
            }, 0) - captainHours;
        var earned = 12 * captainHours + 10 * normalHours;
        return {
            completedOrders: completedOrders,
            captainHours: captainHours,
            totalHours: captainHours + normalHours,
            earned: earned
        };
    },
    "checkCancelCode": function(order_id, cancelCode){
        var res = false;
        var order = Orders.findOne({"_id": order_id});
        if(order){
            res = order.cancelationCode == cancelCode;
        }
        return res;
    },
    'updateProfileImage': function (imageId, id) {
        Meteor.users.update({_id: id}, {
            $set: {
                "profile.image":imageId
            }
        });
    }
});
