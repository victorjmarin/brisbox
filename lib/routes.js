Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    var questions1 = Questions.find({}, {skip: 0, limit: 12});
    this.render('form', {
        data: {
            questions1: questions1
        }
    });
}, {
    waitOn: function () {
        return Meteor.subscribe('questions');
    }
});