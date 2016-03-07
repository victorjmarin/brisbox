Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    this.render('home');
}, {
    name: 'home'
});

Router.route('/about-us', function () {
    this.render('AboutUs');
}, {
    name: 'AboutUs'
});


Router.route('/faqs', function () {
    this.render('Faqs');
}, {
    name: 'Faqs'
});

Router.route('/verifyAccount', function () {
    this.render('VerifyAccount');
}, {
    name: 'VerifyAccount'
});