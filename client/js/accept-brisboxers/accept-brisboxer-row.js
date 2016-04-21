Template.acceptBrisboxerRow.helpers({
    email: function(){
    	return this.emails[0].address;
    },
	verified: function(){
		return this.emails[0].verified;
	}
});

Template.acceptBrisboxerRow.events({
	'change input': function(event) {
		if(this.emails[0].verified){
			Meteor.call("changeAcceptedStatus", this._id, event.target.checked);
		}
	}
})