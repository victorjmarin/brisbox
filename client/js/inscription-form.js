AutoForm.addHooks(['inscriptionForm'], {
    onSuccess: function(formType, result) {
        Router.go("/welcome-view");
    },
    onError: function(formType, result) {
        console.log("inscription-form error!")
    }
})