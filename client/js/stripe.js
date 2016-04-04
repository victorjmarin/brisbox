function cost() {
    var order = Session.get("order");
    return order.numberBrisboxers * order.hours * 20 + " €";
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
    'submit #payment-form': function(e) {
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
            if(currentLocale == "es"){
                var emailSpanish = Session.get("order").email;
                var addressLoading = Session.get("order").addressLoading;
                var addressUnloading = Session.get("order").addressUnloading;
                if(addressLoading!="on"){
                    var addressLoading = "No se ha solicitado carga.";
                }
                if(addressUnloading!="on"){
                    var addressUnloading = "No se ha solicitado descarga.";
                }
                console.log(emailSpanish);
                var subjectSpanish = "Resumen pedido";
                var textSpanish =
                    "¡Gracias por dejarnos ayudarte con la mudanza!\n\n" +
                    "En este correo se recoge un breve resumen de tu pedido." +
                    "\n\nCoste estimado: "+ cost() +
                    "\n\nDirección de carga: "+ addressLoading +
                    "\n\nDirección de descarga: "+ addressLoading +
                    "\n\nDía: "+ Session.get("order").day +
                    "\n\nNombre: "+ Session.get("order").name +
                    "\n\nApellidos: "+ Session.get("order").surname +
                    "\n\nTeléfono: "+ Session.get("order").phone +
                    "\n\nNumero de brisboxers: "+ Session.get("order").numberBrisboxers +
                    "\n\nHoras: "+ Session.get("order").hours +
                    "\n\nSi hay algun problema con tu pedido, comunicanoslo respondiendo a este correo.\n\n" +
                    "Un saludo,¡y gracias de nuevo!\n" +
                    "El equipo de Brisbox";
                Meteor.call("sendEmail", emailSpanish, "hello@brisbox.com", subjectSpanish, textSpanish);
            }else{
                var emailSpanish = Session.get("order").email;
                var addressLoading = Session.get("order").addressLoading;
                var addressUnloading = Session.get("order").addressUnloading;
                if(addressLoading!="on"){
                    var addressLoading = "No request load.";
                }
                if(addressUnloading!="on"){
                    var addressUnloading = "No request unload.";
                }
                var emailEnglish = Session.get("order").email;
                var subjectEnglish = Session.get("order");
                var textEnglish =
                    "Thanks for letting us help with the move!\n\n" +
                    "In this email a brief summary of your order is collected." +
                    "\n\nEstimated cost: "+ cost() +
                    "\n\nAddress: "+ Session.get("order").address +
                    "\n\nDay: "+ Session.get("order").day +
                    "\n\nName: "+ Session.get("order").name +
                    "\n\nSurname: "+ Session.get("order").surname +
                    "\n\nPhone: "+ Session.get("order").phone +
                    "\n\nNumber Brisboxers: "+ Session.get("order").numberBrisboxers +
                    "\n\nHours: "+ Session.get("order").hours +
                    "\n\nIf there is a problem with your order, please let us know by responding to this email.\n\n" +
                    "Grettings,thanks again.!\n" +
                    "Brisbox Team";
                Meteor.call("sendEmail", emailEnglish, "hello@brisbox.com", subjectEnglish,textEnglish);

            }
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