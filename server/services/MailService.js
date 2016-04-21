MailService = {
    notifyCaptain: function (order, captain) {
        var currentLang = ServerSession.get("currentLang")
        TAPi18next.setLng(currentLang)
        Template.registerHelper('_', TAPi18n.__.bind(TAPi18n))
        SSR.compileTemplate('captainEmail', Assets.getText('captain-email.html'));
        var dashboardUrl = process.env.ROOT_URL + "order_dashboard/" + Base64.encode(order._id);
        var faqUrl = process.env.ROOT_URL + "faq#captain";
        var subject = TAPi18n.__("email_captain_subject", null, currentLang);
        var body = SSR.render("captainEmail", {dashboardUrl: dashboardUrl, faqUrl: faqUrl, lng: currentLang});
        Email.send({
            from: "Brisbox <hello@brisbox.com>",
            subject: subject,
            html: body,
            to: captain.emails[0].address
        });
    }
};