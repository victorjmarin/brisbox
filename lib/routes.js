Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
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

Router.route('/stripe_form', function () {
    this.render('stripe_form');
}, {
    name: 'stripe_form'
});

Router.route('/order-form', function () {
   this.render('Order-form');
}, {
    name: 'Order-form'
});

Router.route('/order-checkout', function () {
    this.render('Order-checkout');
}, {
    name: 'Order-checkout'
});