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

Router.route('/order/:_id/assess', {
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

Router.route('/apply', function () {
    this.render('inscription-form');
}, {
    name: 'join-us',
    waitOn: function () {
        return Meteor.subscribe('images');
    }
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
        } else {
            this.next();
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
        } else {
            this.next();
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
        } else {
            this.next();
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
Router.route('/brisboxer/:_id', {
    template: 'brisboxerDetails',
    data: function () {
        var user = Meteor.users.findOne({_id: this.params._id});
        return user;
    },
    name: 'brisboxer-details',
    waitOn: function () {
        return subs.subscribe("brisboxer", this.params._id);
    }
});
Router.route('/brisboxer/:_id/monthly-stats', {
    template: 'monthlyStats',
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        } else if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            this.next();
        } else if (Meteor.userId() != this.params._id) {
            this.render('access-denied');
        } else {
            this.next();
        }
    },
    name: 'monthly-stats'
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
        return [subs.subscribe("oneOrder", Base64.decode(this.params._id)), subs.subscribe("brisboxersOrder")];
    },
    data: function () {
        Session.set('order_id', null);
        var order_id_codificated = this.params._id;
        //console.log(order_id_codificated);
        var order_id = Base64.decode(order_id_codificated);
        Session.set('order_id', order_id);
        sessionStorage.setItem('order_id', order_id);
        //console.log(order_id);
        var order = Orders.find({_id: order_id}).fetch()[0];
        //console.log(order);
        return order;
    },
    name: 'order_dashboard'
});


Router.route('/access-denied', function () {
    this.render('access-denied');
}, {
    name: 'access-denied'
});

Router.route('/order/:_id/finished', {
    template: 'FinishedOrder',
    name: 'finished-order'
});



Router.route('/acceptExtraHours', {
    template: 'acceptExtraHours',
    waitOn: function () {
        return subs.subscribe("extra_hoursAll");
    },
    data: function () {
        var extraHours = "extraHoursNotFound";
        if (sessionStorage.getItem('extraHoursId') != null) {
            var extraHoursIdDecodificado = Base64.decode(sessionStorage.getItem('extraHoursId'));
            extraHours = ExtraHours.find({_id: extraHoursIdDecodificado}).fetch()[0];
        }
        return extraHours;
    },
    name: 'acceptExtraHours'
});
Router.route('/acceptExtraHoursFailed', function () {
    this.render('acceptExtraHoursFailed');
}, {
    name: 'acceptExtraHoursFailed'
});
Router.route('/extraHoursNotFound', function () {
    this.render('extraHoursNotFound');
}, {
    name: 'extraHoursNotFound'
});
Router.route('accept-extra-hours', {
    controller: 'AcceptExtraHoursController',
    path: '/accept-extra-hours/:id',
    action: 'acceptExtraHours'
});