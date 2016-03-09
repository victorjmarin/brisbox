Router.configure({
    layoutTemplate: 'ApplicationLayout',
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
    name: 'incription-form'
});