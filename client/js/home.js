Template.home.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.home.events({
    'submit .zip_form ' : function (event){
        var zip = document.getElementById('inputZip').value;
        var allZips = Meteor.call("getAllZips");
        var inSeville = false;
        for (var i=0; i<allZips.size()-1;i++){
            if(zip == allZips.get(i)){
                inSeville = true;
                break;
            }
        }
        if(inSeville){
            return false;

        }
    }
});