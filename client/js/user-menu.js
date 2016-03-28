Template.userMenu.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    },
    'click #logout': function(event){
  		$('#user-menu').trigger('mouseleave');
  		setTimeout(function(){
  			Meteor.logout();
		}, 180); 
    }
});

Template.userMenu.helpers({
	brisboxerAccepted: function(){
		var user = Meteor.user();
		if(!user || !Roles.userIsInRole(user, ['brisboxer']) || !user.accepted){
			return false;
		}
		return user.accepted;
	}
});