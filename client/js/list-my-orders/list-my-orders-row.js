Template.listMyOrdersRow.helpers({
    "left": function () {
        return this.numberBrisboxers - this.brisboxers.length;
    },
    "prettifyDate": function(date) {
	    var curr_date = date.getDate();
	    var curr_month = date.getMonth() + 1;
	    var curr_year = date.getFullYear();
	    result = curr_date + "/" + curr_month + "/" + curr_year;
	    return result;
	}
});

Template.listMyOrdersRow.events({
    'click #dashboard': function () {
        Router.go('order_dashboard', {_id: Base64.encode(this._id)});
    }
});