Template.listMyOrdersRow.helpers({
    "left": function () {
        return this.numberBrisboxers - this.brisboxers.length;
    },
    "dateFormat": function () {
        return this.date.toLocaleString();
    }
});

Template.listMyOrdersRow.events({
    'click #dashboard': function () {
        location.href="order_dashboard/"+Base64.encode(this._id);
    }
});
