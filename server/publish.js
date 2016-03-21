Meteor.publish('brisboxers', function(){
	return Meteor.users.find({},  {fields: {_id: 1, username: 1, emails: 1, profile: 1, verified: 1, accepted: 1, profile: 1}});
});