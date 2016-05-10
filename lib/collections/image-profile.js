/**
 * Created by FranciscoJavier on 21/04/2016.
 */

Images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("images", {})]
});

Images.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    download: function (userId) {
        return true;
    },
    remove: function (userId) {
        return true;
    }
});