Template.orderGridItem.helpers({
    left: function () {
        return this.numberBrisboxers - this.brisboxers.length;
    },
    dateFormat: function () {
        return this.date.toLocaleString();
    },
    estimatedEarnings: function () {
        return this.hours * 10;
    }
});

Template.orderGridItem.events({
    'click .join': function (event) {
        Meteor.call("joinOrder", this);
    }
});