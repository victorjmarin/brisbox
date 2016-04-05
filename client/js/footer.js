Meteor.subscribe("zipsAll");

Template.pageFooter.events({
    'submit .zip_form ' : function (event){
        var zip = document.getElementById('inputZipFooter').value;
        console.log(zip);
        var zipResult = Zips.findOne({code: zip});
        console.log(zipResult);
        if(zipResult == null){
            Materialize.toast("El código postal debe ser de Sevilla", 2000);
            return false;
        }
    }
});