Meteor.subscribe("brisboxers");

Template.acceptBrisboxers.helpers({
    brisboxers: function(){
    	return Meteor.users.find();
    }
});