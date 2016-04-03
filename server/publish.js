Meteor.publish('brisboxers', function(){
	return Meteor.users.find({roles: "brisboxer"},  {fields: {_id: 1, username: 1, emails: 1, profile: 1, verified: 1, accepted: 1}});
});

Meteor.publish('ordersAvailable', function(){
	var user_id = this.userId;
	if(!user_id){
		user_id = -1;
	}
	//La sentencia $where ejecuta Javascript. Bajo rendimiento con muchos registros. 
	//La unica forma de solucionar el rendimiento es añadir dato derivado persistido que indique que el order está ya asignado completamente.
	return Orders.find({
		$where: "this.brisboxers.length < this.numberBrisboxers",
		"brisboxers._id": {$not: {$eq: user_id}}});
});

Meteor.publish('paco', function(){
	var user_id = this.userId;
	console.log(user_id);
	if(!user_id){
		user_id = -1;
	}
	return Orders.find(/*{"brisboxers._id": {$eq: user_id}}*/ {name: "testAlpha"});
})