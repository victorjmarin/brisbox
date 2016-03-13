Template.layout.onRendered(function () {
        $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
        $(document).ready(function () {
            $('.parallax').parallax();
        });
    }
);

Template.stripe_form.events({
    'submit #payment-form': function(e) {
        e.preventDefault();

        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();
        amountForm = $('#amount').val();

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function(status, response) {
            stripeToken = response.id;
            Meteor.call('chargeCard', stripeToken, amountForm);
        });
    }
});


getUserLanguage = function () {
    return "es";
};


Meteor.startup(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);

    var handler = StripeCheckout.configure({
        key: stripeKey,
        token: function(token) {}
    });

    TAPi18n.setLanguage(getUserLanguage())
        .done(function () {
            Session.set("showLoadingIndicator", false);
        })
        .fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });
});
