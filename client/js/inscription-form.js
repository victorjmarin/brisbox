Meteor.subscribe("zipsAll");

AutoForm.hooks({
    inscriptionForm: {
        before: {
            method: function(doc) {
                this.removeStickyValidationError('email');
                this.removeStickyValidationError('username');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            Router.go("/welcome-view");
        },
        onError: function (formType, error) {
            if (error.errorType && error.errorType === 'Meteor.Error' && error.reason.reason.startsWith("Email")) {
                this.addStickyValidationError('email', "notUnique email");
                AutoForm.validateField(this.formId, 'email');
            }
            if (error.errorType && error.errorType === 'Meteor.Error' && error.reason.reason.startsWith("Username")) {
                this.addStickyValidationError('username', "notUnique username");
                AutoForm.validateField(this.formId, 'username');
            }
        }
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