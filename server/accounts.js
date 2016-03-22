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
        respuesta = "Welcome to BRISBOX, " + user.username + " active your account NOW! ";
    if (currentLocale == "es")
        respuesta = "Bienvenido a BRISBOX, " + user.username + " active su cuenta AHORA! ";
    return respuesta;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    var currentLocale = TAPi18next.lng();
    var respuesta;
    if (currentLocale == "en")
        respuesta = "Welcome " + user.username + ". The brisbox team wish give you thanks to register on the system.\n\n"
            + "Just only one step to get all the BRISBOX's functions.\n\n"
            + "To activate your account, please click on the next link.\n\n"
            + url + "\n\nGreetings BRISBOX's Team";
    if (currentLocale == "es")
        respuesta = "Bienvenido " + user.username + ". El equipo de BRISBOX desea darle las gracias por registrarse en el sistema.\n\n"
            + "Ya solo queda un paso para acceder a todas las funcionalidades de BRISBOX.\n\n"
            + "Para activar su cuenta, haga click en el siguiente enlace.\n\n"
            + url + "\n\nUn saludo el equipo de BRISBOX";
    return respuesta;
};