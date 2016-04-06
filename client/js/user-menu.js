Template.userMenu.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    },
    'click #logout': function(event){
  		$('#user-menu').trigger('mouseleave');
  			Meteor.logout(function(err) {
                if (!err) {
                    Router.go("/");
                    Materialize.toast('<b>' + TAPi18n.__("logout_success") + '</b>', 2700);
                }
            });
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