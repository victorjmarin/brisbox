/**
 * Created by blezerd on 3/04/16.
 */
DeleteOrderController = RouteController.extend({
    deleteOrder: function () {
        console.log("***"+this.params.ord+"***");
        console.log("***"+this.params.token+"***");
        Meteor.call('deleteOrderMethod',this.params.ord, this.params.token);
        Router.go('OrderDeleted');
    }
});
