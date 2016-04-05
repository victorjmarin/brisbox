Template.listMyOrdersRow.helpers({
	"left": function(){
		return this.numberBrisboxers - this.brisboxers.length ;
	},
	"dateFormat": function(){
		return this.date.toLocaleString();
	}
});
