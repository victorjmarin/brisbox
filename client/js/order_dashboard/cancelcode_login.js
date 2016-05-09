Template.CancelCodeLogin.events({
    'submit #cancelCodeLoginForm': function (e) {
        e.preventDefault();
        var order_id = this._id;
        var cancelCode = document.getElementById('cancelCode').value;
        Meteor.call('checkCancelCode', order_id, cancelCode, function (error, response) {
            if (response){
                Session.set("cancelcodelogin", true);
                Materialize.toast('<b>' + TAPi18n.__("cancelcode_success") + '</b>', 2700);
            }else{
                Materialize.toast('<b>' + TAPi18n.__("cancelcode_failed") + '</b>', 2700);
            }
        });
    },
});


