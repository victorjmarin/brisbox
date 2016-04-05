AutoForm.addHooks(['inscriptionForm'], {
    onSuccess: function (formType, result) {
        Router.go("/welcome-view");
    },
    onError: function (formType, result) {
        console.log("inscription-form error!")
    }
});

Template.inscriptionForm.events({
    'click #submit': function (event) {
        var terms = document.getElementById('checkTerms').checked;
        if(terms==false){
            $('#errorTerms').css('display','block');
            return false;
        }else{
            $('#errorTerms').css('display','none');
            return true;
        }
    }
});

Template.inscriptionForm.onRendered(function (){
    $('#errorTerms').css('display','none');
});