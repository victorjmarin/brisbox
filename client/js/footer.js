Meteor.subscribe("zipsAll");

Template.pageFooter.onRendered(function () {
    $(document).ready(function () {
        $('.modal-trigger').leanModal({
            complete: function () {
                $('.lean-overlay').remove();
            }
        });
    });
});

Template.pageFooter.events({
    'submit .zip_form ' : function (event){
        event.preventDefault();
        var lng = TAPi18next.lng();
        var zip = document.getElementById('inputZipFooterMobile').value;
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
    },
    'click .modal1': function (event) {
        $('#modal1').openModal({dismissible: false})
    }
});