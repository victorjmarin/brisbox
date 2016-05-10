CancelOrderController = RouteController.extend({
    orderCancel: function () {
        var idCodificado = this.params.id;
        Meteor.call('acceptExtraHoursController', idCodificado, function( error, response ) {
            if (response == "ACCEPT_EXTRA_HOURS") {
                sessionStorage.setItem("extraHoursId", idCodificado);
                Router.go('AcceptExtraHours');
            }
            if (response == "ALREADY_CHOSED") {
                Router.go('AcceptExtraHoursFailed');
            }
            if (response == "NOTFOUND") {
                Router.go("ExtraHoursNotFound");
            }
        });
    }
});
