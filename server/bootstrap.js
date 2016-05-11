Meteor.startup(function () {
    // code to run on server at startup
    var smtp = {
        username: Meteor.settings.mail.user,
        password: Meteor.settings.mail.password,
        server: 'smtp.gmail.com',
        port: 587
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
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
    if (ExtraHours.find().count()=== 0){
        //loadExtraHours();
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
            assessments: [
                {
                    comments: "Nice",
                    rating: 8
                },
                {
                    comments: "Not bad",
                    rating: 6
                },
                {
                    comments: "A perfect brisboxer",
                    rating: 10
                }
            ],
            "emails.0.verified": true,
            accepted: true
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
            assessments: [
                {
                    comments: "Not bad",
                    rating: 6
                }
            ],
            "emails.0.verified": false,
            accepted: false
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
            assessments: [
                {
                    comments: "Awesome",
                    rating: 10
                },
                {
                    comments: "Perfect!",
                    rating: 9
                }
            ],
            "emails.0.verified": true,
            accepted: true
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
            assessments: [
                {
                    comments: "Horrible",
                    rating: 1
                },
                {
                    comments: "Tssss",
                    rating: 4
                }
            ],
            "emails.0.verified": false,
            accepted: true
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
             assessments: [],
            "emails.0.verified": true,
            accepted: false
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
            assessments: [],
            "emails.0.verified": false,
            accepted: false
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
            assessments: [],
            "emails.0.verified": true,
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
            assessments: [],
            "emails.0.verified": false,
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
            assessments: [],
            "emails.0.verified": true,
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
            assessments: [],
            "emails.0.verified": false,
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


/*function loadExtraHours(){
    var order1 = Orders.findOne({_id: 'LRGPzn3eX7wRB7rnG'});
    var order2 = Orders.findOne({_id: '8MpsK9EbmKxykefRD'});
    var order3 = Orders.findOne({_id: 'LqPDNj3QGjF7xj9hW'});
    var orderGamma = Orders.findOne({_id: '6ixWLJqrBw6H6RdNT'});

    ExtraHours.insert({
        extra_hours: 2,
        accepted: "pending",
        orderId : order1._id
    });

    ExtraHours.insert({
        extra_hours: 2,
        accepted: "pending",
        orderId : order2._id
    });

    ExtraHours.insert({
        extra_hours: 4,
        accepted: "pending",
        orderId : order3._id
    });

    ExtraHours.insert({
        extra_hours: 1,
        accepted: "pending",
        orderId : orderGamma._id
    });
}*/

function loadOrders() {
    var brisboxer1 = Meteor.users.findOne({username: 'brisboxer1'});
    var brisboxer2 = Meteor.users.findOne({username: 'brisboxer2'});
    var brisboxer3 = Meteor.users.findOne({username: 'brisboxer3'});
    var brisboxer4 = Meteor.users.findOne({username: 'brisboxer4'});
    var brisboxer5 = Meteor.users.findOne({username: 'brisboxer5'});

    Orders.insert({
        name: 'Alberto',
        surname: 'García Pérez',
        phone: '000000000',
        email: 'email1@gmail.com',
        numberBrisboxers: 2,
        zip: '41012',
        addressLoading: 'Paseo de la Palmera',
        addressUnloading: '',
        hours: 2,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Bajar electrodomésticos desde un tercero.',
        typeMove: 'load',
        day: new Date('2016-07-03'),
        superCode: "cancelthat1",
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username, assessed: false}
        ]
    });
    Orders.insert({
        name: 'María',
        surname: 'Álvarez Guerrero',
        phone: '333333333',
        email: 'email2@gmail.com',
        numberBrisboxers: 3,
        zip: '41001',
        addressLoading: 'Calle Tetuán',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Subir muebles.',
        typeMove: 'load',
        day: new Date('2016-06-20'),
        superCode: "cancelthat2",
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username, assessed: false},
            {_id: brisboxer3._id, username: brisboxer3.username, assessed: false}
        ]
    });
    Orders.insert({
        name: 'José Antonio',
        surname: 'Rojas Zamora',
        phone: '111111111',
        email: 'email3@gmail.com',
        numberBrisboxers: 1,
        zip: '41002',
        addressLoading: 'Avenida Torneo',
        addressUnloading: '',
        hours: 2,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Dificil acceso',
        typeMove: 'unload',
        day: new Date('2016-08-04'),
        superCode: "cancelthat3",
        brisboxers: [
            {_id: brisboxer1._id, username: brisboxer1.username, assessed: false, captain: true}
        ]
    });
    Orders.insert({
        name: 'Lucas',
        surname: 'García Lopez',
        phone: '222222222',
        email: 'email4@gmail.com',
        numberBrisboxers: 4,
        zip: '41012',
        addressLoading: 'Avenida Reina Mercedes',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Piso grande. Muchos muebles a bajar.',
        typeMove: 'unload',
        day: new Date('2016-07-01'),
        superCode: "cancelthat4",
        brisboxers: [
            {_id: brisboxer2._id, username: brisboxer2.username, assessed: false},
            {_id: brisboxer3._id, username: brisboxer3.username, assessed: false},
            {_id: brisboxer4._id, username: brisboxer4.username, assessed: false},
            {_id: brisboxer5._id, username: brisboxer5.username, assessed: false, captain: true}
        ]
    });

    Orders.insert({
        name: 'Cristóbal',
        surname: 'Borrero Alonso',
        phone: '222222222',
        email: 'emailalpha@gmail.com',
        numberBrisboxers: 3,
        zip: '41004',
        addressLoading: 'Calle Sierpes',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Llamar al móvil para confirmar.',
        typeMove: 'unload',
        day: new Date('2016-07-01'),
        superCode: "cancelthat5",
        brisboxers: []
    });

    Orders.insert({
        name: 'Manuel',
        surname: 'Benitez González',
        phone: '222222222',
        email: 'emailBeta@gmail.com',
        numberBrisboxers: 1,
        zip: '41004',
        addressLoading: 'Calle Tetuán',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Bajar tres mesas desde un cuarto.',
        typeMove: 'unload',
        day: new Date('2016-07-01'),
        superCode: "cancelthat6",
        brisboxers: []
    });

    Orders.insert({
        name: 'Victor',
        surname: 'Cañestro Rojas',
        phone: '222222222',
        email: 'emailGamma@gmail.com',
        numberBrisboxers: 2,
        zip: '41001',
        addressLoading: 'Calle Marqués del Duero',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: '',
        typeMove: 'load',
        day: new Date('2016-07-01'),
        superCode: "cancelthat7",
        brisboxers: []
    });

    Orders.insert({
        name: 'Manuel',
        surname: 'Perez Torroso',
        phone: '441112223',
        email: 'emailTeta@gmail.com',
        numberBrisboxers: 3,
        zip: '41001',
        addressLoading: 'Calle Bailén',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Mover unos muebles de un piso al de abajo.',
        typeMove: 'load',
        day: new Date('2016-07-01'),
        superCode: "cancelthat8",
        brisboxers: []
    });

    Orders.insert({
        name: 'Francisco',
        surname: 'Aranda Gómez',
        phone: '441112223',
        email: 'emailEpsilon@gmail.com',
        numberBrisboxers: 2,
        zip: '41001',
        addressLoading: 'Calle Padre Marchena',
        addressUnloading: '',
        hours: 1,
        startMoment: '12:00 PM',
        canceled: false,
        comments: 'Piso pequeño.',
        typeMove: 'load',
        day: new Date('2016-07-01'),
        superCode: "cancelthat9",
        brisboxers: []
    });

    Orders.insert({
        name: 'Elena',
        surname: 'Pardo Muñoz',
        phone: '441112223',
        email: 'emailCancelada@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: 'Cancelada',
        addressUnloading: '',
        hours: 1,
        canceled: true,
        comments: 'Día no muy seguro.',
        typeMove: 'load',
        day: new Date('2016-07-01'),
        superCode: "cancelthat10",
        brisboxers: []
    });
    Orders.insert({
        name: 'José Luis',
        surname: 'Cepas Rojas',
        phone: '441112223',
        email: 'emailCancelada2@gmail.com',
        numberBrisboxers: 2,
        zip: '41900',
        addressLoading: '',
        addressUnloading: 'Cancelada',
        hours: 1,
        canceled: true,
        comments: 'Posiblemente la cancele.',
        typeMove: 'unload',
        day: new Date('2016-07-01'),
        superCode: "cancelthat11",
        brisboxers: []
    });
}
