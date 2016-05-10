/**
 * Created by Fran Viejo on 10/05/2016.
 */

Template.OrderCancel.events({

    'click #accept': function (event) {
        event.preventDefault();
        var idDecodifidado = this._id;
        var orderId = this.orderId;
        Meteor.call('acceptExtraHours', idDecodifidado, function (error, response){
            if (error) {
                Router.go('acceptExtraHoursFailed');
            } else {
                sessionStorage.removeItem("extraHoursId");
                Router.go('order_dashboard', {_id: orderId});
            }
        });
    },
    'click #reject': function (event) {
        event.preventDefault();
        var idDecodifidado = this._id;
        var orderId = this.orderId;
        Meteor.call('rejectExtraHours', idDecodifidado, function (error, response){
            if (error) {
                Router.go('acceptExtraHoursFailed');
            } else {
                sessionStorage.removeItem("extraHoursId");
                Router.go('order_dashboard', {_id: orderId});
            }
        });
    },
    'click #dashboard': function (event) {
        event.preventDefault();
        Router.go('order_dashboard', {_id: this.orderId});
    }
});