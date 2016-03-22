Meteor.startup(function () {
    // code to run on server at startup
    if (Meteor.users.find().count() === 0) {
        loadAdmins();
        loadBrisboxers();
    }
});


function loadAdmins(){
    var id_admin = Accounts.createUser({
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'croqueta1',
        });
    Roles.addUsersToRoles(id_admin, ['admin']);
}

function loadBrisboxers(){
    var id_brisboxer1 = Accounts.createUser({
            username: 'brisboxer1',
            email: 'brisboxer1@alum.us.es',
            password: 'brisboxer1',
        });
        Roles.addUsersToRoles(id_brisboxer1, ['brisboxer']);
        Meteor.users.update(id_brisboxer1, {
            $set: {
                accepted: true,
                verified: true,
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
                accepted: false,
                verified: true,
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
                accepted: true,
                verified: true,
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

        var id_brisboxer5 = Accounts.createUser({
            username: 'brisboxer5',
            email: 'brisboxer5@alum.us.es',
            password: 'brisboxer5',
        });
        Roles.addUsersToRoles(id_brisboxer5, ['brisboxer']);
        Meteor.users.update(id_brisboxer5, {
            $set: {
                accepted: false,
                verified: true,
            }
        });

        var id_brisboxer6 = Accounts.createUser({
            username: 'brisboxer6',
            email: 'brisboxer6@alum.us.es',
            password: 'brisboxer6',
        });
        Roles.addUsersToRoles(id_brisboxer6, ['brisboxer']);
        Meteor.users.update(id_brisboxer6, {
            $set: {
                accepted: false,
                verified: true,
            }
        });

        var id_brisboxer7 = Accounts.createUser({
            username: 'brisboxer7',
            email: 'brisboxer7@alum.us.es',
            password: 'brisboxer7',
        });
        Roles.addUsersToRoles(id_brisboxer7, ['brisboxer']);
        Meteor.users.update(id_brisboxer7, {
            $set: {
                accepted: false,
            }
        });

        var id_brisboxer8 = Accounts.createUser({
            username: 'brisboxer8',
            email: 'brisboxer8@alum.us.es',
            password: 'brisboxer8',
        });
        Roles.addUsersToRoles(id_brisboxer8, ['brisboxer']);
        Meteor.users.update(id_brisboxer8, {
            $set: {
                verified: true,
                accepted: false,
            }
        });

        var id_brisboxer9 = Accounts.createUser({
            username: 'brisboxer9',
            email: 'brisboxer9@alum.us.es',
            password: 'brisboxer9',
        });
        Roles.addUsersToRoles(id_brisboxer9, ['brisboxer']);
        Meteor.users.update(id_brisboxer9, {
            $set: {
                verified: true,
                accepted: false,
            }
        });

        var id_brisboxer10 = Accounts.createUser({
            username: 'brisboxer10',
            email: 'brisboxer10@alum.us.es',
            password: 'brisboxer10',
        });
        Roles.addUsersToRoles(id_brisboxer10, ['brisboxer']);
        Meteor.users.update(id_brisboxer10, {
            $set: {
                verified: true,
                accepted: true,
            }
        });
}