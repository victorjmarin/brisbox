Template.BrisboxerAssessment.events({
    'click #send': function () {
        var comments = document.getElementById("br-comments").value;
        var rating = document.getElementById("rating").value;
        var error = false;
        if (comments == "") {
            var text = "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "No debe de estar en blanco.";
            }
            document.getElementById("errorComments").innerHTML = text;
            error = true;
        }

        if (rating == "") {
            var text = "Cannot be blank";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "No debe de estar en blanco";
            }
            document.getElementById("errorRating").innerHTML = text;
            error = true;
        } else if (rating > 10 || rating < 0) {
            var text = "Must be between 0 and 10";
            var currentLocale = TAPi18next.lng();
            if (currentLocale == "es") {
                text = "Debe valer entre 0 y 10";
            }
            document.getElementById("errorRating").innerHTML = text;
            error = true;
        }

        if (error == false) {
            Meteor.call("", comments, rating, usuario);
            Router.go('/');
        }
    }
});

Template.BrisboxerAssessment.onRendered(function () {
    $('textarea#br-comments').characterCounter();
});
