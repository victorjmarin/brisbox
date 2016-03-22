Template.acceptBrisboxerRow.helpers({
    email: function(){
    	return this.emails[0].address;
    }
});

Template.acceptBrisboxerRow.events({
	'change input': function(event) {
		Meteor.call("changeAcceptedStatus", this._id, event.target.checked);
		/*Meteor.users.update(this._id, {
        	$set: {accepted: true}
      	});*/

	}
})