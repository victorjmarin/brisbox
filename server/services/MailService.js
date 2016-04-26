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
    },
    orderRegistered: function (order, cancelCode) {
        var encodedOrderId = Base64.encode(order._id);
        var token = (parseInt(order.phone) * 71) + (parseInt(order.zip) * 31);
        var dashboardUrl = Helpers.Url.forPath("order_dashboard/" + encodedOrderId);
        var cancelOrderUrl = Helpers.Url.forPath("cancel-order/" + encodedOrderId + "/" + token);
        var params = {
            name: order.name,
            dashboardUrl: dashboardUrl,
            cancelOrderUrl: cancelOrderUrl,
            cancelCode: cancelCode
        };
        this.send("email_order_registered_subject", "order-registered", params, order.email);
    },
    brisboxerComplete: function (order) {
        var encodedOrderId = Base64.encode(order._id);
        var dashboardUrl = Helpers.Url.forPath("order_dashboard/" + encodedOrderId);
        var params = {
            dashboardUrl: dashboardUrl
        };
        this.send("email_brisboxer_complete_subject", "brisboxer-complete-email", params, order.email);
    }
};