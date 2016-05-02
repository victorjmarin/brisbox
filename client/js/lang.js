Template.langSelector.events({
    'click .changes-lang': function (e) {
        var toLocale = $(e.target).attr('data-lang');
        changeLang(toLocale);
    }
});

changeLang = function (toLocale) {
    var currentLocale = TAPi18n.getLanguage();
    TAPi18n.setLanguage(toLocale).done(function () {
        if (currentLocale != toLocale) {
            $('.toast').remove();
            var msg = TAPi18n.__('lang_changed');
            var undo = TAPi18n.__('undo');
            Session.setPersistent("currentLang", toLocale);
            ServerSession.set("currentLang", toLocale);
            Materialize.toast('<b><span class="truncate">' + msg + '</span></b>', 2700);
        }
    });
}