MailService = {
    notifyCaptain: function (captain) {
        var subject = TAPi18n.__("email_captain_subject");
        var currentLang = ServerSession.get("currentLang")
        Template.registerHelper('_', TAPi18n.__.bind(TAPi18n))
        TAPi18next.setLng(currentLang)
        SSR.compileTemplate('captainEmail', Assets.getText('captain-email.html'));
        var body = SSR.render("captainEmail");
        Email.send({
            from: Meteor.settings.mail.user,
            subject: subject,
            html: body,
            to: captain.emails[0].address
        });
    }
};