Meteor.subscribe("zipsAll");

Template.home.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.home.events({
    'submit .zip_form ' : function (event){
        event.preventDefault();
        var zip = document.getElementById('inputZip').value;
        var zipResult = Zips.findOne({code: zip});
        if(zipResult == null){
            Materialize.toast("El código postal debe ser de Sevilla", 2000);
            return false;
        }
        Router.go('order', null, {query: 'zip=' + zip});
    }
});