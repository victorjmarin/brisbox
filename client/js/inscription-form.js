Template.inscriptionForm.events({
    'submit': function (event) {
        var schoolEmail = document.getElementById("emailSchool").value;
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        Accounts.createUser({username: name, email: schoolEmail, password:password, profile:"brisboxer", validate:false});
    }
});