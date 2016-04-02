Template.listAllOrdersRow.helpers({
	"remainds": function(){
		return this.numberBrisboxers - this.brisboxers.length ;
	}
});