Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function() {
    return this.route('verifyEmail', {
        controller: 'AccountController',
        path: '/verify/:token',
        action: 'verifyEmail'
    });
});

Router.onBeforeAction(function () {
    $('body,html').scrollTop(0);
    this.next();
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


Router.route('/faq', function () {
    this.render('Faq');
}, {
    name: 'Faq'
});

Router.route('/inscription-form', function () {
    this.render('inscription-form');
}, {
    name: 'inscription-form'
});

Router.route('/errorVerifingAccount', function () {
    this.render('errorVerifingAccount');
}, {
    name: 'errorVerifingAccount'
});

Router.route('/successVerifingAccount', function () {
    this.render('successVerifingAccount');
}, {
    name: 'successVerifingAccount'
});

Router.route('/stripe_form', function () {
    this.render('stripe_form');
}, {
    name: 'stripe_form'
});

Router.route('/order-form', function () {
    this.render('orderForm');
}, {
    name: 'orderForm'
});