Meteor.startup(function () {
    // code to run on server at startup
    var smtp = {
        username: Meteor.settings.mail.user,
        password: Meteor.settings.password,
        server: 'smtp.gmail.com',
        port: 587
    };
    process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    if (Meteor.users.find().count() === 0) {
        loadAdmins();
        loadBrisboxers();
    }
    if (Orders.find().count() === 0) {
        loadOrders();
    }
    if (Zips.find().count() === 0) {
        loadZips();
    }
    if (Promotions.find().count()=== 0){
        loadPromotion();
    }
});

function loadAdmins() {
    var id_admin = Accounts.createUser({
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'croqueta1'
    });
    Roles.addUsersToRoles(id_admin, ['admin']);
}

function loadBrisboxers() {
    var id_brisboxer1 = Accounts.createUser({
        username: 'brisboxer1', password: 'brisboxer1', email: 'brisboxer1@alum.us.es',
        profile: {
            name: "brisboxerName1",
            surname: "brisboxerSurname1",
            phone: "111112221",
            zip: "41001",
            howHearAboutUs: "HowHear1"
        }
    });
    Roles.addUsersToRoles(id_brisboxer1, ['brisboxer']);
    Meteor.users.update(id_brisboxer1, {
        $set: {
            accepted: true,
            verified: true
        }
    });
    var id_brisboxer2 = Accounts.createUser({
        username: 'brisboxer2', password: 'brisboxer2', email: 'brisboxer2@alum.us.es',
        profile: {
            name: "brisboxerName2",
            surname: "brisboxerSurname2",
            phone: "222222222",
            zip: "41001",
            howHearAboutUs: "HowHear2"
        }
    });
    Roles.addUsersToRoles(id_brisboxer2, ['brisboxer']);
    Meteor.users.update(id_brisboxer2, {
        $set: {
            accepted: true,
            verified: true
        }
    });

    var id_brisboxer3 = Accounts.createUser({
        username: 'brisboxer3', password: 'brisboxer3', email: 'brisboxer3@alum.us.es',
        profile: {
            name: "brisboxerName3",
            surname: "brisboxerSurname3",
            phone: "333111223",
            zip: "41001",
            howHearAboutUs: "HowHear3"
        }
    });
    Roles.addUsersToRoles(id_brisboxer3, ['brisboxer']);
    Meteor.users.update(id_brisboxer3, {
        $set: {
            accepted: true,
            verified: true
        }
    });

    var id_brisboxer4 = Accounts.createUser({
        username: 'brisboxer4', password: 'brisboxer4', email: 'brisboxer4@alum.us.es',
        profile: {
            name: "brisboxerName4",
            surname: "brisboxerSurname4",
            phone: "441112224",
            zip: "41001",
            howHearAboutUs: "HowHear4"
        }
    });
    Roles.addUsersToRoles(id_brisboxer4, ['brisboxer']);
    Meteor.users.update(id_brisboxer4, {
        $set: {
            accepted: true,
            verified: true
        }
    });

    var id_brisboxer5 = Accounts.createUser({
        username: 'brisboxer5', password: 'brisboxer5', email: 'brisboxer5@alum.us.es',
        profile: {
            name: "brisboxerName5",
            surname: "brisboxerSurname5",
            phone: "551112225",
            zip: "41003",
            howHearAboutUs: "HowHear5"
        }
    });
    Roles.addUsersToRoles(id_brisboxer5, ['brisboxer']);
    Meteor.users.update(id_brisboxer5, {
        $set: {
            accepted: false,
            verified: true
        }
    });

    var id_brisboxer6 = Accounts.createUser({
        username: 'brisboxer6', password: 'brisboxer6', email: 'brisboxer6@alum.us.es',
        profile: {
            name: "brisboxerName6",
            surname: "brisboxerSurname6",
            phone: "666112226",
            zip: "41003",
            howHearAboutUs: "HowHear6"
        }
    });
    Roles.addUsersToRoles(id_brisboxer6, ['brisboxer']);
    Meteor.users.update(id_brisboxer6, {
        $set: {
            accepted: false,
            verified: false
        }
    });

    var id_brisboxer7 = Accounts.createUser({
        username: 'brisboxer7', password: 'brisboxer7', email: 'brisboxer7@alum.us.es',
        profile: {
            name: "brisboxerName7",
            surname: "brisboxerSurname7",
            phone: "677776777",
            zip: "41003",
            howHearAboutUs: "HowHear7"
        }
    });
    Roles.addUsersToRoles(id_brisboxer7, ['brisboxer']);
    Meteor.users.update(id_brisboxer7, {
        $set: {
            accepted: false
        }
    });

    var id_brisboxer8 = Accounts.createUser({
        username: 'brisboxer8', password: 'brisboxer8', email: 'brisboxer8@alum.us.es',
        profile: {
            name: "brisboxerName8",
            surname: "brisboxerSurname8",
            phone: "688886888",
            zip: "41004",
            howHearAboutUs: "HowHear8"
        }
    });
    Roles.addUsersToRoles(id_brisboxer8, ['brisboxer']);
    Meteor.users.update(id_brisboxer8, {
        $set: {
            verified: true,
            accepted: false
        }
    });

    var id_brisboxer9 = Accounts.createUser({
        username: 'brisboxer9', password: 'brisboxer9', email: 'brisboxer9@alum.us.es',
        profile: {
            name: "brisboxerName9",
            surname: "brisboxerSurname9",
            phone: "966669998",
            zip: "41001",
            howHearAboutUs: "HowHear9"
        }
    });
    Roles.addUsersToRoles(id_brisboxer9, ['brisboxer']);
    Meteor.users.update(id_brisboxer9, {
        $set: {
            verified: true,
            accepted: true
        }
    });

    var id_brisboxer10 = Accounts.createUser({
        username: 'brisboxer10', password: 'brisboxer10', email: 'brisboxer10@alum.us.es',
        profile: {
            name: "brisboxerName10",
            surname: "brisboxerSurname10",
            phone: "910101010",
            zip: "41004",
            howHearAboutUs: "HowHear10"
        }
    });
    Roles.addUsersToRoles(id_brisboxer10, ['brisboxer']);
    Meteor.users.update(id_brisboxer10, {
        $set: {
            verified: true,
            accepted: true
        }
    });
}

function loadZips() {
    Zips.insert({
        code: "41000"
    });
    Zips.insert({
        code: "41001"
    });
    Zips.insert({
        code: "41002"
    });
    Zips.insert({
        code: "41003"
    });
    Zips.insert({
        code: "41004"
    });
    Zips.insert({
        code: "41005"
    });
    Zips.insert({
        code: "41006"
    });
    Zips.insert({
        code: "41007"
    });
    Zips.insert({
        code: "41008"
    });
    Zips.insert({
        code: "41009"
    });
    Zips.insert({
        code: "41010"
    });
    Zips.insert({
        code: "41011"
    });
    Zips.insert({
        code: "41012"
    });
    Zips.insert({
        code: "41013"
    });
    Zips.insert({
        code: "41014"
    });
    Zips.insert({
        code: "41015"
    });
    Zips.insert({
        code: "41016"
    });
    Zips.insert({
        code: "41017"
    });
    Zips.insert({
        code: "41018"
    });
    Zips.insert({
        code: "41019"
    });
    Zips.insert({
        code: "41020"
    });
    Zips.insert({
        code: "41092"
    });
}

function loadPromotion(){
    Promotions.insert({
       code: "probrisbox"
    });
}

function loadOrders() {
    var brisboxer1 = Meteor.users.findOne({username: 'brisboxer1'});
    var brisboxer2 = Meteor.users.findOne({username: 'brisboxer2'});
    var brisboxer3 = Meteor.users.findOne({username: 'brisboxer3'});
    var brisboxer4 = Meteor.users.findOne({username: 'brisboxer4'});
    var brisboxer5 = Meteor.users.findOne({username: 'brisboxer5'});

    Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '000000000',
        email: 'email1@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: 'Test1',
        addressUnloading: '',
        hours: 2,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'comments1',
        typeMove: 'load',
        date: new Date('2016-07-03'),
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username}
        ]
    });
    Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '333333333',
        email: 'email2@gmail.com',
        numberBrisboxers: 3,
        zip: '41900',
        addressLoading: 'Test2',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'comments2',
        typeMove: 'load',
        date: new Date('2016-06-20'),
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username},
            {_id: brisboxer3._id, username: brisboxer3.username}
        ]
    });
    Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '111111111',
        email: 'email3@gmail.com',
        numberBrisboxers: 1,
        zip: '41900',
        addressLoading: 'Test3',
        addressUnloading: '',
        hours: 2,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'comments3',
        typeMove: 'unload',
        date: new Date('2016-08-04'),
        brisboxers: [
            {_id: brisboxer1._id, username: brisboxer1.username}
        ]
    });
    Orders.insert({
        name: 'nameTest',
        surname: 'surnameTest',
        phone: '222222222',
        email: 'email4@gmail.com',
        numberBrisboxers: 4,
        zip: '41900',
        addressLoading: 'Test3',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'comments4',
        typeMove: 'unload',
        date: new Date('2016-07-01'),
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username},
            {_id: brisboxer3._id, username: brisboxer3.username},
            {_id: brisboxer4._id, username: brisboxer4.username},
            {_id: brisboxer5._id, username: brisboxer5.username}
        ]
    });

    Orders.insert({
        name: 'testAlpha',
        surname: 'surnameAlpha',
        phone: '222222222',
        email: 'emailalpha@gmail.com',
        numberBrisboxers: 3,
        zip: '41900',
        addressLoading: 'alpha',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'commentsAlpha',
        typeMove: 'unload',
        date: new Date('2016-07-01'),
        brisboxers: []
    });

    Orders.insert({
        name: 'testBeta',
        surname: 'surnameBeta',
        phone: '222222222',
        email: 'emailBeta@gmail.com',
        numberBrisboxers: 1,
        zip: '41900',
        addressLoading: 'beta',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'commentsBeta',
        typeMove: 'unload',
        date: new Date('2016-07-01'),
        brisboxers: []
    });

    Orders.insert({
        name: 'testGamma',
        surname: 'surnameGamma',
        phone: '222222222',
        email: 'emailGamma@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: 'gamma',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'commentsGamma',
        typeMove: 'load',
        date: new Date('2016-07-01'),
        brisboxers: []
    });

    Orders.insert({
        name: 'testTeta',
        surname: 'surnameTeta',
        phone: '441112223',
        email: 'emailTeta@gmail.com',
        numberBrisboxers: 3,
        zip: '41900',
        addressLoading: 'teta',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'commentsTeta',
        typeMove: 'load',
        date: new Date('2016-07-01'),
        brisboxers: []
    });

    Orders.insert({
        name: 'testEpsilon',
        surname: 'surnameEpsilon',
        phone: '441112223',
        email: 'emailEpsilon@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: 'epsilon',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'commentsEpsilon',
        typeMove: 'load',
        date: new Date('2016-07-01'),
        brisboxers: []
    });

    Orders.insert({
        name: 'testCancelada',
        surname: 'surnameCancelada',
        phone: '441112223',
        email: 'emailCancelada@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: 'Cancelada',
        addressUnloading: '',
        hours: 1,
        canceled: true,
        comments: 'commentsCancelada',
        typeMove: 'load',
        date: new Date('2016-07-01'),
        brisboxers: []
    });
    Orders.insert({
        name: 'testCancelada2',
        surname: 'surnameCancelada2',
        phone: '441112223',
        email: 'emailCancelada2@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: '',
        addressUnloading: 'Cancelada',
        hours: 1,
        canceled: true,
        comments: 'commentsCancelada',
        typeMove: 'unload',
        date: new Date('2016-07-01'),
        brisboxers: []
    });
}