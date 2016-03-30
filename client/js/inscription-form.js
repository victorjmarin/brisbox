AutoForm.addHooks(['inscriptionForm'], {
    onSuccess: function(formType, result){
        Router.go("/");
    },
    onError: function(formType, result){

    }
})