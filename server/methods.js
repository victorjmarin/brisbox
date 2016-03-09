Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false, loginExpirationInDays: 10});



function sendEmailVerification(userID, username, email){
    if(email.contains("@alum.us.es") || email.contains("@alu.upo.es")) {
        var validator = userID*17+userID*37;
        var validatorLink="http://estuforce.meteor.com/verifyAccount?validator="+validator+"&username="+username;
        try {
            if (Meteor.isServer) { //Falta comprobar el idioma de la web para que el correo sea del mismo idioma.
                Email.send({
                    from: "estuforce@delabahia.es",
                    to: email,
                    subject: "Valida ahora tu cuenta de BRISBOX!",
                    text: "Hola, "+username+". Bienvenid@ a BRISBOX. \nHaz click en el siguiente enlace para validar tu cuenta! "+validatorLink
                });
                MongoID.insert(username,userID, validator);
            }
        } catch (e) {
            throw new Meteor.Error('Exception sending email.', e);
        }
    }
}