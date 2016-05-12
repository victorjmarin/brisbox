/**
 * Created by Fran Viejo on 10/05/2016.
 */

Template.acceptExtraHours.events({

    'click #accept': function (event) {
        event.preventDefault();
        var idDecodifidado = this._id;
        var orderId = this.orderId;
        Meteor.call('acceptExtraHours', idDecodifidado, function (error, response){
            if (error) {
                Router.go('acceptExtraHoursFailed');
            } else {
                sessionStorage.removeItem("extraHoursId");
                Router.go('order_dashboard', {_id: Base64.encode(orderId)});
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
                Router.go('order_dashboard', {_id: Base64.encode(orderId)});
            }
        });
    },
    'click #dashboard': function (event) {
        event.preventDefault();
        Router.go('order_dashboard', {_id: Base64.encode(this.orderId)});
    }
});

Template.acceptExtraHours.onRendered(function(){
    var self = this;

    this.autorun(function (a) {
        var data = Template.currentData(self.view);
        if (data == "extraHoursNotFound"){
            Router.go('extraHoursNotFound');
        }
    });
})