Template.CancelCodeLogin.events({
    /*'click #cancel': function (event) {
        var cancelationCode = document.getElementById("cancelationCode").value;
        var orderIdCodificado = sessionStorage.getItem("ord");
        Meteor.call('cancelOrder', orderIdCodificado, cancelationCode, function (error, response) {
            if (response) {
                sessionStorage.removeItem("ord");
                Router.go('OrderCanceledSuccess');
            } else {
                Router.go('OrderCancelFailed');
            }
        });
    },
    'click #dashboard': function (event) {
        var orderIdCodificado = sessionStorage.getItem("ord");
        Router.go('order_dashboard', {_id: orderIdCodificado});

    },*/
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


