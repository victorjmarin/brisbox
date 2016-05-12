AcceptExtraHoursController = RouteController.extend({
    acceptExtraHours: function () {
        var idCodificado = this.params.id;
        Meteor.call('acceptExtraHoursController', idCodificado, function( error, response ) {
            if (response == "ACCEPT_EXTRA_HOURS") {
                sessionStorage.setItem("extraHoursId", idCodificado);
                Router.go('acceptExtraHours');
            }
            if (response == "ALREADY_CHOSED") {
                Router.go('acceptExtraHours');
            }
            if (response == "NOTFOUND") {
                Router.go("extraHoursNotFound");
            }
        });
    }
});
