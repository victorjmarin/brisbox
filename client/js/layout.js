Template.ApplicationLayout.helpers({
	'showLoginModal': function(){
		//Variable de sesion que recogera el template ApplicationLayout en layout.js para mostrar o no la ventana de login
        return Session.get('showLoginModal');
    }
});
/**Template.ApplicationLayout.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    }
});*/