Meteor.subscribe("zipsAll");

Template.pageFooter.events({
    'submit .zip_form ' : function (event){
        event.preventDefault();
        var lng = TAPi18next.lng();
        var zip = document.getElementById('inputZipFooter').value;
        var zipResult = Zips.findOne({code: zip});
        if(zipResult == null){
            if(lng == "es"){
                Materialize.toast("El código postal debe ser de Sevilla", 2000);
            }else{
                Materialize.toast("ZIP must be in Seville", 2000);
            }
            return false;
        }
        Router.go('order', null, {query: 'zip=' + zip});
    }
});