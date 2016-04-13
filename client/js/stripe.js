function cost() {
    return sessionStorage.getItem("numberBrisboxers") * sessionStorage.getItem("hours") * 20 + " €";
}

Template.stripe_form.onRendered(function () {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey(stripeKey);

    Session.set("stripe_error", null);
});

Template.stripe_form.helpers({
    stripe_error: function() {
        return Session.get("stripe_error");
    },
    disabled: function(){
        if (Session.get("enableStripeForm")){
            return "";
        }else{
            return "disabled";
        }
    }
});

Template.stripe_form.events({
    'submit .stripe-form': function(e) {
        e.preventDefault();

        ccNum = $('#number').val();
        cvc = $('#cvc').val();
        expMo = $('#exp-month').val();
        expYr = $('#exp-year').val();
        amountForm = $('#amount').val();

        if(!amountForm){
            amountForm = Meteor.settings.public.reserveAmount;
        }
        Session.set("stripe_error", null);

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function(status, response) {

            if(amountForm < 50){
                var code = "invalid_amount";
                Session.set("stripe_error", code);
            }else if(status != 200){
                var code = response.error.code;
                Session.set("stripe_error", code);
            }else {
                stripeToken = response.id;
                Meteor.call('chargeCard', stripeToken, amountForm, function(error, succeed){
                    if(error){
                        var code = error.reason;
                        Session.set("stripe_error", code);
                    }
                });
            }
        });
        if(Session.get("stripe_error") == null){
            var currentLocale = TAPi18next.lng();
            var addressLoading = sessionStorage.getItem("addressLoading");
            var addressUnloading = sessionStorage.getItem("addressUnloading");
            var email = sessionStorage.getItem("email");
            if(currentLocale == "es"){
                if(sessionStorage.getItem("loading")!="on"){
                    addressLoading = "No se ha solicitado carga.";
                }
                if(sessionStorage.getItem("unloading")!="on"){
                    addressUnloading = "No se ha solicitado descarga.";
                }
                var subjectSpanish = "Resumen pedido";
                var textSpanish =
                    "¡Gracias por dejarnos ayudarte con la mudanza!\n\n" +
                    "En este correo se recoge un breve resumen de tu pedido." +
                    "\n\nCoste estimado: "+ cost() +
                    "\n\nDirección de carga: "+ addressLoading +
                    "\n\nDirección de descarga: "+ addressUnloading +
                    "\n\nDía: "+ sessionStorage.getItem("day") +
                    "\n\nNombre: "+ sessionStorage.getItem("name") +
                    "\n\nApellidos: "+ sessionStorage.getItem("surname") +
                    "\n\nTeléfono: "+ sessionStorage.getItem("phone") +
                    "\n\nNumero de brisboxers: "+ sessionStorage.getItem("numberBrisboxers") +
                    "\n\nHoras: "+ sessionStorage.getItem("hours") +
                    "\n\nSi hay algun problema con tu pedido, comunicanoslo respondiendo a este correo.\n\n" +
                    "Un saludo,¡y gracias de nuevo!\n" +
                    "El equipo de Brisbox";
                Router.go('ThanksOrder');
            }else{
                if(addressLoading!="on"){
                    addressLoading = "No request load.";
                }
                if(addressUnloading!="on"){
                    addressUnloading = "No request unload.";
                }
                var subjectEnglish = "Summary order";
                var textEnglish =
                    "Thanks for letting us help with the move!\n\n" +
                    "In this email a brief summary of your order is collected." +
                    "\n\nEstimated cost: "+ cost() +
                    "\n\nAddress loading: "+ addressLoading +
                    "\n\nAddress unloading: "+ addressUnloading +
                    "\n\nDay: "+ sessionStorage.getItem("day") +
                    "\n\nName: "+ sessionStorage.getItem("name") +
                    "\n\nSurname: "+ sessionStorage.getItem("surname") +
                    "\n\nPhone: "+ sessionStorage.getItem("phone") +
                    "\n\nNumber Brisboxers: "+ sessionStorage.getItem("numberBrisboxers") +
                    "\n\nHours: "+ sessionStorage.getItem("hours") +
                    "\n\nIf there is a problem with your order, please let us know by responding to this email.\n\n" +
                    "Grettings,thanks again.!\n" +
                    "Brisbox Team";
                Meteor.call("sendEmail", email, "hello@brisbox.com", subjectEnglish,textEnglish);
                Router.go('ThanksOrder');
            }
            Meteor.call("saveOrder", Session.get("orderForm"));
        }
    },
    'click #info-pay ':function(e){
        $(document).ready(function(){
            $('.collapsible').collapsible({
                accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    }
});