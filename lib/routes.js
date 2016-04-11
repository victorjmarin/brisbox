var filters = {
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
    },
    brisboxerAccepted: function () {
        var user;
        user = Meteor.user();
        if(!user) {
            this.layout("layout");
            this.render("notFound");
            return
        }
        if(!Roles.userIsInRole(user, ['brisboxer'])){
            this.layout("layout");
            this.render("notFound");
            return
        }
        if(!user.accepted){
            this.layout("layout");
            this.render("notFound");
            return
        }
        this.layout('layout');
        this.next();
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

Router.route('/brisboxer/assessment', function () {
    this.render('BrisboxerAssessment');
}, {
    name: 'BrisboxerAssessment'
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
    name: 'order-checkout'
});

Router.route('/brisboxers', function() {
    this.render('acceptBrisboxers');
}, {
    name: "accept-brisboxers",
    before: filters.admin
});

Router.route('/contact-us', function () {
    this.render('ContactUs');
}, {
    name: 'ContactUs'
});

Router.route('/thanks-email', function () {
    this.render('ThanksEmail');
}, {
    name: 'ThanksEmail'
});

Router.route('/list-all-orders', function(){
    this.render('ListAllOrders');
}, {
    name: "list-all-orders",
    waitOn: function () {
        return Meteor.subscribe('ordersAvailable');
    },
    before: filters.brisboxerAccepted
});

Router.route('/list-my-orders', function(){
    this.render('ListMyOrders');
}, {
    name: "list-my-orders",
    waitOn: function () {
        return Meteor.subscribe('myOrders');
    },
    before: filters.brisboxerAccepted
})
Router.route('/verified', function () {
    this.render('AccountVerified');
}, {
    name: 'AccountVerified'
});
Router.route('verify-email',{
    controller: 'AccountController',
    path: '/verify-email/:token',
    action: 'verifyEmail'
});
Router.route('/terms', function () {
    this.render('terms');
}, {
    name: 'terms'
});
Router.route('/welcome-view', function () {
    this.render('welcome-view');
}, {
    name: 'welcome-view'
});

Router.route('/order_dashboard', function () {
    this.render('order_dashboard');
}, {
    name: 'order_dashboard'
});

Router.route('/order-email', function () {
    this.render('ThanksOrder');
}, {
    name: 'ThanksOrder'
});

Router.route('/brisboxer/details/:_id', {
    template: 'brisboxerDetails',
    waitOn: function(){
        Meteor.subscribe("brisboxers");
    },
    data: function(){
        var user = Meteor.users.findOne({ _id: this.params._id });
        console.log(this.params._id);
        return user;
    },
    name: 'brisboxer-details',
    before: function(){
        //Comprobamos que solo el propio brisboxer o un administrador puede acceder a esta ruta
        var user= Meteor.user()
        if (!user) {
            this.layout("layout");
            this.render('notFound');
            return
        }else if (Roles.userIsInRole(user, ['brisboxer'])){
            if (user._id != this.params._id){
                this.layout("layout");
                this.render('notFound');
                return
            }else{
                this.layout('layout');
                this.next();
            }
        }else if (Roles.userIsInRole(user, ['admin'])){
            this.layout('layout');
            this.next();
        }else{
            this.layout("layout");
            this.render('notFound');
            return
        }
    }
});