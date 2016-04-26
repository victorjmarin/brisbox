/**
 * Created by Antonio on 06/04/2016.
 */
Template.registerHelper("prettifyDate", function (date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1;
    var curr_year = date.getFullYear();
    result = curr_date + "/" + curr_month + "/" + curr_year;
    return result;
});
Template.registerHelper("replaceSpace", function (string) {
    return string.split(' ').join('+');
});

Template.registerHelper("calculateCost", function (numBrisboxers, hours) {
    return numBrisboxers * hours * 20 + " €";
});

Template.registerHelper("orderDay", function (date) {
    var hoy = new Date();
    var diaPedidoSub1 = date.setTime(date.getTime() - 86400000);
    return diaPedidoSub1.before(hoy);
});

Template.order_dashboard.events({
    'click #cancel': function (event) {
        Router.go('cancel-order', {
            ord: Base64.encode(this._id),
            token: ((parseInt(this.phone) * 71) + (parseInt(this.zip) * 31))
        });
    }
});
