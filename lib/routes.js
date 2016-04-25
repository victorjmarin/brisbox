var subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

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
        if (!user) {
            this.layout("layout");
            this.render("notFound");
            return
        }
        if (!Roles.userIsInRole(user, ['brisboxer'])) {
            this.layout("layout");
            this.render("notFound");
            return
        }
        if (!user.accepted) {
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

Router.route('/brisboxer/assessment/:_id', {
    waitOn: function () {
        var order_id_decode = Base64.decode(this.params._id);
        return subs.subscribe("oneOrder", order_id_decode);
    },
    data: function () {
        var order_id_decode = Base64.decode(this.params._id);
        var order = Orders.findOne({_id: order_id_decode});
        return order;
    },
    name: 'BrisboxerAssessment',
    template: 'BrisboxerAssessment',
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

Router.route('/brisboxers', function () {
    this.render('acceptBrisboxers');
}, {
    name: "accept-brisboxers",
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        } else if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
            this.render('access-denied');
        } else if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            this.render('acceptBrisboxers');
        }
    },
    before: filters.admin,
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

Router.route('/list-all-orders', function () {
    this.render('ListAllOrders');
}, {
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        } else if (!Roles.userIsInRole(Meteor.user(), ['brisboxer'])) {
            this.render('access-denied');
        } else if (Roles.userIsInRole(Meteor.user(), ['brisboxer'])) {
            this.render('ListAllOrders');
        }
    },
    waitOn: function () {
        return subs.subscribe('ordersAvailable');
    },
    name: "list-all-orders",
    before: filters.brisboxerAccepted
});

Router.route('/list-my-orders', function () {
    this.render('ListMyOrders');
}, {
    name: "list-my-orders",
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        } else if (!Roles.userIsInRole(Meteor.user(), ['brisboxer'])) {
            this.render('access-denied');
        } else if (Roles.userIsInRole(Meteor.user(), ['brisboxer'])) {
            this.render('ListMyOrders');
        }
    },
    waitOn: function () {
        return subs.subscribe('myOrders');
    },
    before: filters.brisboxerAccepted
});
Router.route('/verified', function () {
    this.render('AccountVerified');
}, {
    name: 'AccountVerified'
});
Router.route('verify-email', {
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

/*Router.route('/order_dashboard', function () {
 this.render('order_dashboard');
 }, {
 name: 'order_dashboard'
 });
 */
Router.route('/order-email', function () {
    this.render('ThanksOrder');
}, {
    name: 'ThanksOrder'
});
Router.route('/brisboxer/details/:_id', {
    template: 'brisboxerDetails',
    data: function () {
        var user = Meteor.users.findOne({_id: this.params._id});
        return user;
    },
    name: 'brisboxer-details',
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        }else if ((Roles.userIsInRole(Meteor.user(), ['brisboxer'])) || (Roles.userIsInRole(Meteor.user(), ['admin']))) {
            this.render('brisboxerDetails');
        }else{
            this.render('access-denied');
        }
    },
    waitOn: function () {
        return subs.subscribe("brisboxers");
    },
    before: function () {
        //Comprobamos que solo el propio brisboxer o un administrador puede acceder a esta ruta
        var user = Meteor.user()
        if (!user) {
            this.layout("layout");
            this.render('notFound');
            return
        } else if (Roles.userIsInRole(user, ['brisboxer'])) {
            if (user._id != this.params._id) {
                this.layout("layout");
                this.render('notFound');
                return
            } else {
                this.layout('layout');
                this.next();
            }
        } else if (Roles.userIsInRole(user, ['admin'])) {
            this.layout('layout');
            this.next();
        } else {
            this.layout("layout");
            this.render('notFound');
            return
        }
    }
});
Router.route('/orderCancel', function () {
    this.render('OrderCancel');
}, {
    name: 'OrderCancel'
});
Router.route('/orderCanceledSuccess', function () {
    this.render('OrderCanceledSuccess');
}, {
    name: 'OrderCanceledSuccess'
});
Router.route('/orderCancelFailed', function () {
    this.render('OrderCancelFailed');
}, {
    name: 'OrderCancelFailed'
});
Router.route('/orderNotFound', function () {
    this.render('OrderNotFound');
}, {
    name: 'OrderNotFound'
});
Router.route('cancel-order', {
    controller: 'CancelOrderController',
    path: '/cancel-order/:ord/:token',
    action: 'orderCancel'
});
Router.route('/order_dashboard/:_id', {
    template: 'order_dashboard',
    waitOn: function () {
        return subs.subscribe("oneOrder", Base64.decode(this.params._id));
    },
    data: function () {
        Session.set('order_id', null);
        var order_id_codificated = this.params._id;
        //console.log(order_id_codificated);
        var order_id = Base64.decode(order_id_codificated);
        Session.set('order_id', order_id);
        //console.log(order_id);
        var order = Orders.find({_id: order_id}).fetch()[0];
        //console.log(order);
        return order;
    },
    name: 'order_dashboard'
});


Router.route('/acces-denied', function () {
    this.render('acces-denied');
}, {
    name: 'acces-denied'
});