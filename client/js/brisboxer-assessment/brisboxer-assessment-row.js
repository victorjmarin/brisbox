Template.BrisboxerAssessmentRow.events({
    'click #send': function (e) {
        e.preventDefault();
        _id = this._id;
        var comments = document.getElementById("br-comments-" + _id).value;
        var rating = parseInt(document.getElementById("rating-" + _id).value);
        var orderId = Session.get("orderId");
        var error = false;
        if (comments == "") {
            var text = "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "No debe de estar en blanco.";
            }
            document.getElementById("errorComments-" + _id).innerHTML = text;
            error = true;
        }

        if (rating == "") {
            var text = "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "No debe de estar en blanco";
            }
            document.getElementById("errorRating-" + _id).innerHTML = text;
            error = true;
        } else if (rating > 10 || rating < 0) {
            var text = "Must be between 0 and 10";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "Debe valer entre 0 y 10";
            }
            document.getElementById("errorRating-" + _id).innerHTML = text;
            error = true;
        }

        if (error == false) {
            Meteor.call("assessBrisboxer", orderId, this._id, comments, rating);
        }
    }
});

Template.BrisboxerAssessmentRow.helpers({
    imageProfile: function () {
        var brisboxer = Meteor.users.findOne(this._id);
        if (brisboxer.profile.image && brisboxer.profile.image != null) {
            return "/cfs/files/images/".concat(brisboxer.profile.image);
        } else {
            return "/placeholder.png";
        }
    }
});