Template.layout.helpers({
	'showLoginModal': function(){
        return Session.get('showLoginModal');
    }

});
Template.layout.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    }
})