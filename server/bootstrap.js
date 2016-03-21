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
        Meteor.users.update(id_brisboxer1, {
            $set: {
                accepted: true
            }
        });

        var id_brisboxer2 = Accounts.createUser({
            username: 'brisboxer2',
            email: 'brisboxer2@alum.us.es',
            password: 'brisboxer2',
        });
        Roles.addUsersToRoles(id_brisboxer2, ['brisboxer']);
        Meteor.users.update(id_brisboxer2, {
            $set: {
                accepted: false
            }
        });

        var id_brisboxer3 = Accounts.createUser({
            username: 'brisboxer3',
            email: 'brisboxer3@alum.us.es',
            password: 'brisboxer3',
        });
        Roles.addUsersToRoles(id_brisboxer3, ['brisboxer']);
        Meteor.users.update(id_brisboxer3, {
            $set: {
                accepted: false
            }
        });

        var id_brisboxer4 = Accounts.createUser({
            username: 'brisboxer4',
            email: 'brisboxer4@alum.us.es',
            password: 'brisboxer4',
        });
        Roles.addUsersToRoles(id_brisboxer4, ['brisboxer']);
        Meteor.users.update(id_brisboxer4, {
            $set: {
                accepted: false
            }
        });
    }
});