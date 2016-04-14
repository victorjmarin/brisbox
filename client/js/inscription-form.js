AutoForm.addHooks(['inscriptionForm'], {
    onSuccess: function (formType, result) {
        Router.go("/welcome-view");
    },
    onError: function (formType, result) {
        console.log(result.toString());
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
    },
    'click #accept_terms': function (event) {
        document.getElementById("checkTerms").checked = true;
    },
    'click #refuse_terms': function (event) {
        document.getElementById("checkTerms").checked = false;
    },
    'click #openModalTerms': function (event) {
        $('#checkModal1').openModal({dismissible: false})
    }

});

Template.inscriptionForm.onRendered(function (){
    $('#errorTerms').css('display','none');

    $(document).ready(function () {
        $('.modal-trigger').leanModal({
            complete: function () {
                $('.lean-overlay').remove();
            }
        });
    });
});