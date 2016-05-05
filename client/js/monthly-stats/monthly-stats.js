Template.monthlyStats.helpers({
    month: function () {
        var currentLocale = TAPi18n.getLanguage();
        if (currentLocale == 'es') {
            var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        } else if (currentLocale == 'en') {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
        var today = new Date();
        var currentMonth = months[today.getMonth()];
        Session.set("currentMonth", currentMonth)
        return Session.get("currentMonth");
    },
    completedOrders: function () {
        if (Session.get("stats")) {
            return Session.get("stats").completedOrders;
        }
        return "N/A";
    },
    captainHours: function () {
        if (Session.get("stats")) {
            return Session.get("stats").captainHours;
        }
        return "N/A";
    },
    earned: function () {
        if (Session.get("stats")) {
            return Session.get("stats").earned;
        }
        return "N/A";
    },
    totalHours: function () {
        if (Session.get("stats")) {
            return Session.get("stats").totalHours;
        }
        return "N/A";
    }
});

Template.monthlyStats.onRendered(function () {
    Meteor.call("monthly-stats", Router.current().params["_id"], function (err, res) {
        if (!err) {
            Session.set("stats", res);
        }
    });
});