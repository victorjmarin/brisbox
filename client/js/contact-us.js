Template.ContactUs.events({
    'click #send': function () {
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var asunto = document.getElementById("asunto").value;
        var contenido = document.getElementById("contenido").value;
        Meteor.call("sendEmailToBrisbox", correo, asunto, nombre+" "+contenido);
        Router.go('ThanksEmail');
    }
});

