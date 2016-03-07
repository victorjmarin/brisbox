Template.langSelector.events({

    'click .changes-lang': function (e) {
        var toLocale = $(e.target).attr('data-lang');
        changeLang(toLocale);
    }

});

changeLang = function (toLocale) {

    var currentLocale = TAPi18n.getLanguage();
    console.log(currentLocale);

    TAPi18n.setLanguage(toLocale).done(function () {
        if (currentLocale != toLocale) {
            $('.toast').remove();
            var msg = TAPi18n.__('lang_changed');
            var undo = TAPi18n.__('undo');
            Materialize.toast('<span class="truncate">' + msg + '</span><a class="btn-flat orange-text" onclick="changeLang(\'' + currentLocale + '\')"><strong>' + undo + '</stron><a>', 2700);
        }
    });
}