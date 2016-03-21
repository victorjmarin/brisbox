Meteor.subscribe("brisboxers");

Template.acceptBrisboxers.helpers({
    brisboxers: function(){
    	//Quitamos el primer elemento de la coleccion ya que cuando estamos logueados, 
    	//el primer elemento siempre es el usuario logueado, independiente de los objetos publicados.
    	var brisboxers = Meteor.users.find().fetch();
    	return brisboxers.slice(1, brisboxers.length);
    }
});