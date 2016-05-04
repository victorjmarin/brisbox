Meteor.subscribe("findCodePromotion");

function cost() {
    return sessionStorage.getItem("numberBrisboxers") * sessionStorage.getItem("hours") * 20 + " €";
}

Template.stripe_form.onRendered(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);

    Session.set("stripe_error", null);
});

Template.stripe_form.helpers({
    stripe_error: function () {
        return Session.get("stripe_error");
    },
    disabled: function () {
        if (Session.get("enableStripeForm")) {
            return "";
        } else {
            return "disabled";
        }
    },
    isCreation: function () {
        return Session.get('isCreation');
    }
});

Template.stripe_form.events({
    'submit .stripe-form': function (e) {
        e.preventDefault();
        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();

        var currentLocale = TAPi18next.lng();
        var codePromotion = $('#promotion').val();
        if (codePromotion && codePromotion.length != 0) {
            var codePromotionResult = Promotions.findOne({code: codePromotion});
            if (codePromotionResult == null) {
                if (codePromotion != "") {
                    if (currentLocale == "es") {
                        Materialize.toast("El código promocional no es correcto, lo sentimos.", 2000);
                    } else {
                        Materialize.toast("Promotion code is not correct, sorry.", 2000);
                    }
                    return false;
                }
            }
        }else{
            amountForm = $('#amount').val();

            if (!amountForm && !Session.get("isCreation")) {
                amountForm = Session.get("finalCost") * 100
            } else if (!amountForm) {
                amountForm = Meteor.settings.public.reserveAmount;
            }
            Session.set("stripe_error", null);
        }
        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function (status, response) {

            if (status != 200) {
                var code = response.error.code;
                Session.set("stripe_error", code);
            } else {
                stripeToken = response.id;
                Meteor.call('chargeCard', stripeToken, amountForm, function (error, succeed) {
                    if (error) {
                        var code = error.reason;
                        Session.set("stripe_error", code);
                    }else{
                        if(!Session.get("isCreation")){
                            var order_id = Session.get("order_id");
                            Meteor.call('updateOrdersCountToBrisboxersInOrder', order_id);
                        }
                    }
                });
            }
        });

        if (Session.get("stripe_error") == null) {
            if (Session.get("isCreation")) {
                var addressLoading = sessionStorage.getItem("addressLoading");
                var addressUnloading = sessionStorage.getItem("addressUnloading");
                var portalLoading = sessionStorage.getItem("portalLoading");
                var portalUnloading = sessionStorage.getItem("portalUnloading");
                var zip = sessionStorage.getItem("zip");
                var loading = sessionStorage.getItem("loading");
                var unloading = sessionStorage.getItem("unloading");
                var comments = sessionStorage.getItem("comments");
                var numberBrisboxers = sessionStorage.getItem("numberBrisboxers");
                var hours = sessionStorage.getItem("hours");
                var startMoment = sessionStorage.getItem("startMoment");
                var day = sessionStorage.getItem("day");
                var name = sessionStorage.getItem("name");
                var surname = sessionStorage.getItem("surname");
                var phone = sessionStorage.getItem("phone");
                var email = sessionStorage.getItem("email");
                if (currentLocale == "es") {
                    if (addressLoading == "") {
                        addressLoading = "No se ha solicitado carga.";
                        portalLoading = "No se ha solicitado carga.";
                    }
                    if (addressUnloading == "") {
                        addressUnloading = "No se ha solicitado descarga.";
                        portalUnloading = "No se ha solicitado descarga.";
                    }
                } else {
                    if (addressLoading == "") {
                        addressLoading = "No request load.";
                        portalLoading = "No request load.";
                    }
                    if (addressUnloading == "") {
                        addressUnloading = "No request unload.";
                        portalUnloading = "No request unload.";
                    }
                }
                Router.go('ThanksOrder');
                Meteor.call("saveOrder", addressLoading, addressUnloading, portalLoading, portalUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                    startMoment, new Date(day), name, surname, phone, email);
            } else {
                $('#payment-access').addClass('payment-close');
                $('#payment-overlay').css('display', 'none');
                $('#payment-main').css('display', 'none');
                $('#payment-access').css('display', 'none');
                $('#payment-form').addClass("hidden");
                Materialize.toast(TAPi18n.__('payment_confirmation_paied'), 4000);// 4000 is the duration of the toast
                Router.go("finished-order", {_id: Base64.encode(this._id)});
            }
        }
    }
    ,
    'click #info-pay ': function (e) {
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    }
});