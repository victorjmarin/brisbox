Template.userMenu.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    },
    'click #usermenu-content': function(){
    	Meteor.logout();
    }
});