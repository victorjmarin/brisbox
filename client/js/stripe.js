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

        var currentLocale = TAPi18next.lng();
        var codePromotion = document.getElementById("promotion").value;
        var codePromotionResult = Promotions.findOne({code: codePromotion});
        if(codePromotionResult == null) {
            if(codePromotion!=""){
                if (currentLocale == "es") {
                    Materialize.toast("El código promocional no es correcto, lo sentimos.");
                }else{
                    Materialize.toast("Promotion code is not correct, sorry.");
                }
            }
            Stripe.card.createToken({
                number: ccNum,
                cvc: cvc,
                exp_month: expMo,
                exp_year: expYr
            }, function(status, response) {

                if(status != 200){
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
        }
        if(Session.get("stripe_error") == null){
            var addressLoading = sessionStorage.getItem("addressLoading");
            var addressUnloading = sessionStorage.getItem("addressUnloading");
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
            if(currentLocale == "es"){
                if(addressLoading==null){
                    addressLoading = "No se ha solicitado carga.";
                }
                if(addressUnloading==null){
                    addressUnloading = "No se ha solicitado descarga.";
                }
                var subjectSpanish = "Resumen pedido";
                var textSpanish =
                    "¡Gracias por dejarnos ayudarte con la mudanza!\n\n" +
                    "En este correo se recoge un breve resumen de tu pedido." +
                    "\nCoste estimado: "+ cost() +
                    "\nDirección de carga: "+ addressLoading +
                    "\nDirección de descarga: "+ addressUnloading +
                    "\nDía: "+ day +
                    "\nHora del pedido: "+ startMoment +
                    "\nNombre: "+ name +
                    "\nApellidos: "+ surname +
                    "\nComentarios: "+ comments +
                    "\nTeléfono: "+ phone +
                    "\nNumero de brisboxers: "+ numberBrisboxers +
                    "\nHoras: "+ hours +
                    "\nSi hay algun problema con tu pedido, comunicanoslo respondiendo a este correo.\n\n" +
                    "Un saludo,¡y gracias de nuevo!\n" +
                    "El equipo de Brisbox";
                Meteor.call("sendEmailToUser", email, subjectSpanish,textSpanish);
                Router.go('ThanksOrder');
            }else{
                if(addressLoading==null){
                    addressLoading = "No request load.";
                }
                if(addressUnloading==null){
                    addressUnloading = "No request unload.";
                }
                var subjectEnglish = "Summary order";
                var textEnglish =
                    "Thanks for letting us help with the move!\n\n" +
                    "In this email a brief summary of your order is collected." +
                    "\nEstimated cost: "+ cost() +
                    "\nAddress loading: "+ addressLoading +
                    "\nAddress unloading: "+ addressUnloading +
                    "\nDay: "+ day +
                    "\nStart moment: "+ startMoment +
                    "\nName: "+ name +
                    "\nSurname: "+ surname +
                    "\nComments: "+ comments +
                    "\nPhone: "+ phone +
                    "\nNumber Brisboxers: "+ numberBrisboxers +
                    "\nHours: "+ hours +
                    "\nIf there is a problem with your order, please let us know by responding to this email.\n\n" +
                    "Grettings,thanks again.!\n" +
                    "Brisbox Team";
                Meteor.call("sendEmailToUser", email, subjectEnglish,textEnglish);
                Router.go('ThanksOrder');
            }
            Meteor.call("saveOrder", addressLoading, addressUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                startMoment, day, name, surname, phone, email);
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