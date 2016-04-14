var Future = Npm.require('fibers/future');
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

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

    'saveOrder': function (orderForm) {
        Orders.insert(orderForm);
    },

    'prueba': function (text) {
        console.log(text);
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
    }

});