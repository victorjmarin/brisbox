Meteor.startup(function () {
    // code to run on server at startup
    process.env.MAIL_URL = 'smtp://hello@brisbox.com:Estuforce2.0@smtp.1and1.com:587'
    if (Meteor.users.find().count() === 0) {
        loadAdmins();
        loadBrisboxers();
    }
    if(Orders.find().count() === 0){
        loadOrderss();
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

function loadOrderss(){
    var brisboxer1 = Meteor.users.findOne({username: 'brisboxer1'});
    var brisboxer2 = Meteor.users.findOne({username: 'brisboxer2'});
    var brisboxer3 = Meteor.users.findOne({username: 'brisboxer3'});
    var brisboxer4 = Meteor.users.findOne({username: 'brisboxer4'});
    var brisboxer5 = Meteor.users.findOne({username: 'brisboxer5'});


    var order1_id = Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '000000000',
        email: 'email1@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        address: 'Test1',
        hours: 2,
        comments: 'comments1',
        typeMove: 'loading',
        date: new Date('2016-07-03'),
        brisboxers: [{_id: brisboxer2._id, username: brisboxer2.username}]
    });
    var order2_id = Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '333333333',
        email: 'email2@gmail.com',
        numberBrisboxers: 3,
        zip: '41900',
        address: 'Test2',
        hours: 1,
        comments: 'comments2',
        typeMove: 'loading',
        date: new Date('2016-06-20'),
        brisboxers: [{_id: brisboxer2._id, username: brisboxer2.username}, {_id: brisboxer3._id, username: brisboxer3.username}]
    });
    var order3_id = Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '111111111',
        email: 'email3@gmail.com',
        numberBrisboxers: 1,
        zip: '41900',
        address: 'Test3',
        hours: 2,
        comments: 'comments3',
        typeMove: 'unloading',
        date: new Date('2016-08-04'),
        brisboxers: [{_id: brisboxer1._id, username: brisboxer1.username}]
    });
     var order4_id = Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '222222222',
        email: 'email4@gmail.com',
        numberBrisboxers: 4,
        zip: '41900',
        address: 'Test3',
        hours: 1,
        comments: 'comments4',
        typeMove: 'unloading',
        date: new Date('2016-07-01'),
        brisboxers: [{_id: brisboxer2._id, username: brisboxer2.username}, {_id: brisboxer3._id, username: brisboxer3.username}, {_id: brisboxer4._id, username: brisboxer4.username}, {_id: brisboxer5._id, username: brisboxer5.username}]
    });
}