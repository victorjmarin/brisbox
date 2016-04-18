/**
 * Created by blezerd on 14/03/16.
 */
Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false, loginExpirationInDays: 10});
Accounts.emailTemplates.siteName = "Brisbox";
Accounts.emailTemplates.from = "Brisbox <hello@brisbox.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    var currentLang = ServerSession.get("currentLang")
    return TAPi18n.__("email_validation_subject", null, currentLang);
};
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    var url = url.replace('#/', '');
    var currentLang = ServerSession.get("currentLang")
    Template.registerHelper('_', TAPi18n.__.bind(TAPi18n))
    TAPi18next.setLng(currentLang)
    SSR.compileTemplate('verificationEmail', Assets.getText('verification-email.html'));
    return SSR.render("verificationEmail", {user: user, url: url, lng: currentLang});
};