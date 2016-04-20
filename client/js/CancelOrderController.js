/**
 * Created by blezerd on 3/04/16.
 */
CancelOrderController = RouteController.extend({
    orderCancel: function () {
        var idCodificado=this.params.ord;
        Meteor.call('deleteOrderMethod', idCodificado, this.params.token, function( error, response ) {
            if (response == "TOCANCEL") {
                sessionStorage.setItem("ord", idCodificado);
                Router.go('OrderCancel');
            }
            if (response == "NOTCANCELED") {
                Router.go('OrderCancelFailed');
            }
            if (response == "NOTFOUND") {
                Router.go("OrderNotFound");
            }
        });
    }
});
