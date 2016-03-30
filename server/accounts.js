/**
 * Created by blezerd on 14/03/16.
 */
Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false, loginExpirationInDays: 10});


Accounts.emailTemplates.siteName = "BRISBOX";
Accounts.emailTemplates.from = "Brisbox <hello@brisbox.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    var currentLocale = TAPi18next.lng();
    var respuesta;
    if (currentLocale == "en")
        respuesta = "Just one step away! ";
    if (currentLocale == "es")
        respuesta = "¡Sólo un paso más! ";
    return respuesta;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    var currentLocale = TAPi18next.lng();
    var respuesta;
    if (currentLocale == "en")
        respuesta = "Hi " + user.username + "!\n\n" +
            "Thank you for your interest in helping make moves a little less stressing :)\n\n" +
            "Click the link below to verify your email address" + url +". Once you've verified it, we will get in touch with you in order to activate your account. From that moment on, you will be able to see the moves available and start working on those which are convenient for you.\n\n" +
            "Brisbox team";
    if (currentLocale == "es")
        respuesta = "¡Hola " + user.username + "!\n\n" +
            "Gracias por tu interés en ayudar a hacer las mudanzas algo más llevaderas :)\n\n" +
            "Haz click en el siguiente enlace para validar tu email" + url +". Una vez validado, nos pondremos en contacto contigo y procederemos a activar tu cuenta" +
            " para que puedas ver las mudanzas disponibles y trabajar en las que te convenga.\n\n" +
            "El equipo de Brisbox";
    return respuesta;
};