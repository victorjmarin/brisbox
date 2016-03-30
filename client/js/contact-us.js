Template.ContactUs.events({
    'click #send': function () {
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var asunto = document.getElementById("asunto").value;
        var contenido = document.getElementById("contenido").value;
        var patronCorreo = new RegExp('/\S+@\S+\.\S+/');
        var fallo = false;
        if (nombre == "") {
            var texto= "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if(currentLocale=="es"){
                texto="No debe de estar en blanco.";
            }
            document.getElementById("errorName").innerHTML = texto;
            fallo = true;
        }
        if (patronCorreo.test(correo) == false) {
            var texto= "Invalid email";
            var currentLocale = TAPi18next.lng();
            if(currentLocale=="es"){
                texto="Correo inválido.";
            }
            document.getElementById("errorEmail").innerHTML = texto;
            fallo = true;
        }
        if (asunto == "") {
            var texto= "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if(currentLocale=="es"){
                texto="No debe de estar en blanco";
            }
            document.getElementById("errorSubject").innerHTML = texto;
            fallo = true;
        }
        if (asunto == "") {
            var texto= "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if(currentLocale=="es"){
                texto="No debe de estar en blanco";
            }
            document.getElementById("errorContent").innerHTML = texto;
            fallo = true;
        }
        if (fallo == false) {
            Meteor.call("sendEmailToBrisbox", correo, asunto, nombre + " " + contenido);
            Router.go('ThanksEmail');
        }
    }
});

