MailService = {
    send: function (subjectKey, htmlTemplate, params, to) {
        var templateId = "templateId";
        currentLang = ServerSession.get("currentLang");
        TAPi18next.setLng(currentLang)
        Template.registerHelper('_', TAPi18n.__.bind(TAPi18n))
        SSR.compileTemplate(templateId, Assets.getText(htmlTemplate + '.html'));
        var subject = TAPi18n.__(subjectKey, null, currentLang);
        params.lng = currentLang;
        var body = SSR.render(templateId, params);
        Email.send({
            from: "Brisbox <hello@brisbox.com>",
            subject: subject,
            html: body,
            to: to
        });
    },
    notifyCaptain: function (order, captain) {
        var dashboardUrl = Helpers.Url.forPath("order_dashboard/" + Base64.encode(order._id));
        var faqUrl = Helpers.Url.forPath("faq#captain");
        var params = {
            dashboardUrl: dashboardUrl,
            faqUrl: faqUrl
        };
        var captainAddress = captain.emails[0].address;
        this.send("email_captain_subject", "captain-email", params, captainAddress);
    }
}
;