/**
 * Created by blezerd on 3/04/16.
 */
CancelOrderController = RouteController.extend({
    orderCancel: function () {
        Meteor.call('deleteOrderMethod', this.params.ord, this.params.token, function( error, response ) {
            if (response == "CANCELED") {
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
