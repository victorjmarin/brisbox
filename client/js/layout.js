Template.ApplicationLayout.helpers({
	'showLoginModal': function(){
        return Session.get('showLoginModal');
    }

});
Template.ApplicationLayout.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    }
})