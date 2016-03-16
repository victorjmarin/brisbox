Meteor.startup(function () {
    // code to run on server at startup
    if (Meteor.users.find().count() === 0) {
        var id_admin = Accounts.createUser({
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'croqueta1',
        });
        Roles.addUsersToRoles(id_admin, ['admin']);

        var id_brisboxer1 = Accounts.createUser({
            username: 'brisboxer1',
            email: 'brisboxer1@alum.us.es',
            password: 'brisboxer1',
        });
        Roles.addUsersToRoles(id_brisboxer1, ['brisboxer']);
    }
});