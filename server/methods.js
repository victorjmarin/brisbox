Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false, loginExpirationInDays: 10});



function sendEmailVerification(userID, name, email){
    if(email.contains("@alum.us.es") || email.contains("@alu.upo.es")) {
        var validatorLink="http://estuforce.meteor.com/verifyAccount?validator="
        //falta hacerle un validator y comprobarlo despues
        try {
            if (Meteor.isServer) { //Falta comprobar el idioma de la web para que el correo sea del mismo idioma.
                Email.send({
                    from: "estuforce@delabahia.es",
                    to: email,
                    subject: "Valida ahora tu cuenta!",
                    text: "Hola, "+name+". Bienvenid@ a ESTUFORCE Haz click en el siguiente enlace para validar tu cuienta! "+validatorLink
                });
            }
        } catch (e) {
            throw new Meteor.Error('Exception sending email.', e);
        }
    }
}