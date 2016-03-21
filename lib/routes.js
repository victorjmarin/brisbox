var filters = {

  /**
   * ensure user is l
   */
    admin: function () {
        var user
        if (Meteor.loggingIn()) {
            this.layout("layout");
            this.render('notFound');
            return
        } else {
            user = Meteor.user()
            if (!user) {
                this.layout("layout");
                this.render('notFound');
                return
            }
            if (!Roles.userIsInRole(user, ['admin'])) {
                this.layout('layout');
                this.render('notFound');
                return
            }
        }
        this.layout('layout')
        this.next()
    }
};


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

Router.route('/privacy', function () {
    this.render('privacy');
}, {
    name: 'privacy'
});

Router.route('/join-us', function () {
    this.render('inscription-form');
}, {
    name: 'join-us'
});

Router.route('/stripe_form', function () {
    this.render('stripe_form');
}, {
    name: 'stripe_form'
});

Router.route('/order', function () {
   this.render('Order-form');
}, {
    name: 'order'
});

Router.route('/order-checkout', function () {
    this.render('Order-checkout');
}, {
    name: 'Order-checkout'
});

Router.route('/accept-brisboxers', function() {
    this.render('accept-brisboxers');
}, {
    name: "accept-brisboxers",
    before: filters.admin
})