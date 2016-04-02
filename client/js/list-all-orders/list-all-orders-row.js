Template.listAllOrdersRow.helpers({
	"left": function(){
		return this.numberBrisboxers - this.brisboxers.length ;
	},
	"dateFormat": function(){
		return this.date.toLocaleString();
	}
});

Template.listAllOrdersRow.events({
	'click .join': function(event) {
		Meteor.call("joinOrder", this);
	}
});