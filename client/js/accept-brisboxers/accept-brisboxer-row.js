Template.acceptBrisboxerRow.helpers({
    email: function(){
    	return this.emails[0].address;
    }
});

Template.acceptBrisboxerRow.events({
	'change input': function(event) {
		if(this.verified){
			Meteor.call("changeAcceptedStatus", this._id, event.target.checked);
		}
	}
})