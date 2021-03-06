Template.OrderCancel.events({
    'click #cancel': function (event) {
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

    }
});


