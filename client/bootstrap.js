Meteor.startup(function () {
    Tracker.autorun(function () {
        if (Meteor.status().connected) {
            TAPi18n.setLanguage(getUserLanguage());
        }
    });
});

getUserLanguage = function () {
    var currentLang = Session.get("currentLang");
    var lang = "en";
    if (currentLang) {
        lang = currentLang;
    }
    Session.setPersistent("currentLang", lang);
    ServerSession.set("currentLang", lang);
    return lang;
};