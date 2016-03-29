Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameval = event.target.username.value;
        var passwordval = event.target.password.value;
        if(usernameval!="" && passwordval){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    Session.set('alert', "login_error_credentials_wrong");
                }else{
                    Session.set('alert', null);
                    $('#login-access').removeClass('login-open').addClass('login-close');
                    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
                }
            });
        }else{
            Session.set('alert', "login_error_credentials_wrong");
        }
    },
    'click #login-overlay': function(event){
        Session.set('showLoginModal', false);
        Session.set('alert', null);
    },
    'click #login-main': function(event){
        if(event.target.id==="login-main"){
            Session.set('showLoginModal', false);
            Session.set('alert', null);
        }
    }
});
Template.login.helpers({
    'hasErrors': function(){
        return Session.get("alert") != null;
    },
    'alert': function(){
        return Session.get("alert");
    }
})
Template.login.onRendered(function(){
    $('#login-access').addClass('login-open');
    $('#login-overlay').css('display', 'block');
	$('#login-main').css('display', 'block');
	$('#login-access').css('display', 'block');

    $('#login-content').delay(150).slideDown("slow");
})