Template.FinishedOrder.events({
    'click #assess_btn': function () {
        Router.go("BrisboxerAssessment", {_id: Router.current().params["_id"]});
    }
})