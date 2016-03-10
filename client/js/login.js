Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameval = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(usernameval, passwordVar);
    },
    'click #login-overlay': function(event){
        Session.set('showLoginModal', false);
    },
    'click #login-main': function(event){
        if(event.target.id==="login-main"){
            Session.set('showLoginModal', false);
        }
    }
});
Template.login.onRendered(function(){
	$('#login-overlay').css('display', 'block');
	$('#login-main').css('display', 'block');
	$('#login-access').css('display', 'block');

    $('#login-content').delay(150).slideDown("slow");
})