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
    }
});

Template.stripe_form.events({
    'submit .stripe-form': function (e) {
        e.preventDefault();

        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();
        amountForm = $('#amount').val();

        if (!amountForm) {
            amountForm = Meteor.settings.public.reserveAmount;
        }
        Session.set("stripe_error", null);

        var currentLocale = TAPi18next.lng();
        var codePromotion = document.getElementById("promotion").value;
        var codePromotionResult = Promotions.findOne({code: codePromotion});
        console.log(codePromotionResult);
        if (codePromotionResult == null) {
            if (codePromotion != "") {
                if (currentLocale == "es") {
                    Materialize.toast("El código promocional no es correcto, lo sentimos.", 2000);
                } else {
                    Materialize.toast("Promotion code is not correct, sorry.", 2000);
                }
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
                        }
                    });
                }
            });
        }
        if (Session.get("stripe_error") == null) {
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
            Meteor.call("saveOrder", addressLoading, addressUnloading, portalLoading, portalUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                startMoment, new Date(day), name, surname, phone, email, function (error) {
                    if (!error) {
                        Router.go('ThanksOrder');
                    }
                });
        }
    },
    'click #info-pay ': function (e) {
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    }
});