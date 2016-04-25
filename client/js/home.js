Meteor.subscribe("zipsAll");

Template.home.onRendered(function () {
    sessionStorage.setItem("first-access", false);
    $('.tooltipped').tooltip({delay: 50});
    $(document).ready(function(){
        $('.slider').slider({full_width: true});
        $('.slider').attr('style','');
        $('.slides').attr('style','');
    });
});

Template.home.events({
    'submit .zip_form ' : function (event){
        event.preventDefault();
        var lng = TAPi18next.lng();
        var zip = document.getElementById('inputZip').value;
        var zipResult = Zips.findOne({code: zip});
        if(zipResult == null){
            if(lng == "es"){
                Materialize.toast("El código postal debe ser de Sevilla", 2000);
            }else{
                Materialize.toast("ZIP must be in Seville", 2000);
            }
            return false;
        }
        sessionStorage.setItem("zipTemporaly", zip);
        Router.go('order', null, {query: 'zip=' + zip});
    }
});