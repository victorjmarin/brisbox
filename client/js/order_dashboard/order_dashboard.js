/**
 * Created by Antonio on 06/04/2016.
 */
Template.registerHelper("prettifyDate", function (date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1;
    var curr_year = date.getFullYear();
    result = curr_date + "/" + curr_month + "/" + curr_year;
    return result;
});
Template.registerHelper("replaceSpace", function (string) {
    return string.split(' ').join('+');
});

Template.registerHelper("notEmpty", function (brisboxers) {
    return brisboxers.length>0
});

Template.registerHelper("calculateCost", function (numBrisboxers, hours) {
    return numBrisboxers * hours * 20 + " €";
});

Template.order_dashboard.helpers({
    'notInOrder': function(){
        var brisboxers = this.brisboxers;
        var brisboxersIds = _.pluck(brisboxers, "_id");
        var result = !_.contains(brisboxersIds, Meteor.userId());
        return result;
    }
});

Template.order_dashboard.events({
    'click .confirm-payment': function(e){
        Session.set('showPaymentConfirmationModal', true);
    },
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
                    Materialize.toast("El código promocional no es correcto, lo sentimos.", 2000);
                }else{
                    Materialize.toast("Promotion code is not correct, sorry.", 2000);
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
            if(currentLocale == "es"){
                if(addressLoading==""){
                    addressLoading = "No se ha solicitado carga.";
                    portalLoading = "No se ha solicitado carga.";
                }
                if(addressUnloading==""){
                    addressUnloading = "No se ha solicitado descarga.";
                    portalUnloading = "No se ha solicitado descarga.";
                }
                var subjectSpanish = "[BRISBOX] Resumen pedido";
                var textSpanish =
                    "¡Gracias por dejarnos ayudarte con la mudanza!\n\n" +
                    "En este correo se recoge un breve resumen de tu pedido." +
                    "\nCoste estimado: "+ cost() +
                    "\nDirección de carga: "+ addressLoading + ", Portal de carga: " + portalLoading +
                    "\nDirección de descarga: "+ addressUnloading + ", Portal de descarga: " + portalUnloading +
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
                if(addressLoading==""){
                    addressLoading = "No request load.";
                    portalLoading = "No request load.";
                }
                if(addressUnloading==""){
                    addressUnloading = "No request unload.";
                    portalUnloading = "No request unload.";
                }
                var subjectEnglish = "[BRISBOX] Summary order";
                var textEnglish =
                    "Thanks for letting us help with the move!\n\n" +
                    "In this email a brief summary of your order is collected." +
                    "\nEstimated cost: "+ cost() +
                    "\nAddress loading: "+ addressLoading + ", Loading portal: " + portalLoading +
                    "\nAddress unloading: "+ addressUnloading + ", Unloading portal: " + portalUnloading +
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
            Meteor.call("saveOrder", addressLoading, addressUnloading, portalLoading, portalUnloading, zip, loading, unloading, comments, numberBrisboxers, hours,
                startMoment, new Date(day), name, surname, phone, email);
        }
    }
});
Template.registerHelper("orderDay", function (date) {
    var hoy = new Date();
    var diaPedidoSub1 = date.setTime(date.getTime() - 86400000);
    return diaPedidoSub1.getTime()>hoy.getTime();
});

Template.order_dashboard.events({
    'click #cancel': function (event) {
        Router.go('cancel-order', {
            ord: Base64.encode(this._id),
            token: ((parseInt(this.phone) * 71) + (parseInt(this.zip) * 31))
        });
    }
});
