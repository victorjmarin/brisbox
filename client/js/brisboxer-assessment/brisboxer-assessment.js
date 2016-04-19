Template.BrisboxerAssessment.helpers({
    "order": function(){
        return this;
    },
    "orderId": function(){
        return Orders.findOne({"_id": this._id})._id;
    }
});

Template.BrisboxerAssessment.onRendered(function(){
    var self = this;

    this.autorun(function(a) {
        var data = Template.currentData(self.view);
        if(!data) return;
        Session.set("orderId", data._id);
    });
})