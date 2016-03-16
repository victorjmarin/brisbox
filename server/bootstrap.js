Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://hello@brisbox.com:Estuforce2.0@smtp.1and1.com:587';
    if (Accounts.users.find().count() === 0) {
        Accounts.createUser({
            username: "alecroqueta",
            email: "alexbalmar@gmail.com",
            password: "croqueta1",
            profile: "brisboxer"
        });
    }

});