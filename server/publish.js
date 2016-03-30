Meteor.publish('brisboxers', function(){
	return Meteor.users.find({roles: "brisboxer"},  {fields: {_id: 1, username: 1, emails: 1, profile: 1, verified: 1, accepted: 1}});
});

Meteor.publish('ordersAvailable', function(){
	var user = Meteor.user();
	var user_id = -1;
	if(user){
		user_id = user._id;
	}
	//La sentencia $where ejecuta Javascript. Bajo rendimiento con muchos registros. 
	//La unica forma de solucionar el rendimiento es añadir dato derivado persistido que indique que el order está ya asignado completamente.
	return Order.find({
		$where: "this.brisboxers.length < this.numberBrisboxers",
		"brisboxers._id": user_id});
});