function cost() {
    var order = Session.get("orderForm");
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
            var addressLoading = Session.get("orderForm").addressLoading;
            var addressUnloading = Session.get("orderForm").addressUnloading;
            var email = Session.get("orderForm").email;
            console.log(email);
            if(currentLocale == "es"){
                if(Session.get("orderForm").loading!="on"){
                    addressLoading = "No se ha solicitado carga.";
                }
                if(Session.get("orderForm").unloading!="on"){
                    addressUnloading = "No se ha solicitado descarga.";
                }
                console.log(email);
                var subjectSpanish = "Resumen pedido";
                var textSpanish =
                    "¡Gracias por dejarnos ayudarte con la mudanza!\n\n" +
                    "En este correo se recoge un breve resumen de tu pedido." +
                    "\n\nCoste estimado: "+ cost() +
                    "\n\nDirección de carga: "+ addressLoading +
                    "\n\nDirección de descarga: "+ addressUnloading +
                    "\n\nDía: "+ Session.get("orderForm").day +
                    "\n\nNombre: "+ Session.get("orderForm").name +
                    "\n\nApellidos: "+ Session.get("orderForm").surname +
                    "\n\nTeléfono: "+ Session.get("orderForm").phone +
                    "\n\nNumero de brisboxers: "+ Session.get("orderForm").numberBrisboxers +
                    "\n\nHoras: "+ Session.get("orderForm").hours +
                    "\n\nSi hay algun problema con tu pedido, comunicanoslo respondiendo a este correo.\n\n" +
                    "Un saludo,¡y gracias de nuevo!\n" +
                    "El equipo de Brisbox";
                Meteor.call("sendEmail", email, "hello@brisbox.com", subjectSpanish, textSpanish);
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
                    "\n\nDay: "+ Session.get("orderForm").day +
                    "\n\nName: "+ Session.get("orderForm").name +
                    "\n\nSurname: "+ Session.get("orderForm").surname +
                    "\n\nPhone: "+ Session.get("orderForm").phone +
                    "\n\nNumber Brisboxers: "+ Session.get("orderForm").numberBrisboxers +
                    "\n\nHours: "+ Session.get("orderForm").hours +
                    "\n\nIf there is a problem with your order, please let us know by responding to this email.\n\n" +
                    "Grettings,thanks again.!\n" +
                    "Brisbox Team";
                console.log(Session.get("orderForm"));
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