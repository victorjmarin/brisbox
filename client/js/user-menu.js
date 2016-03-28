Template.userMenu.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    },
    'click #logout': function(event){
  		$('#user-menu').trigger('mouseleave');
  		setTimeout(function(){
  			Meteor.logout();
  			Router.go("/");
		}, 180); 
    }
});