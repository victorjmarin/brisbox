/**
 * Created by Cristian Poley on 10/03/2016.
 */

Order = new Mongo.Collection("order");

//TODO: Removed SchemaOrder because Order needs more attributes that they can't appear in the order's form 
/*SchemaOrder = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 200
    },
    surname: {
        type: String,
        min: 3,
        max: 200
    },
    phone: {
        type: String,
        regEx: /^[0-9]{9}$/
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
    },
    numberBrisboxers: {
        type: Number,
        min: 1
    },
    zip: {
        type: String,
        regEx: /^[0-9]{5}$/
    },
    address: {
        type: String,
    },
    hours:{
        type: Number,
        min: 1
    },
    comments:{ 
        type: String,
        optional: true
    },
    typeMove:{
        type: String,
        regEx: /^(loading)(unloading)/
    },
    day:{
        type: Date,
        optional: true
    }
});*/

Meteor.startup(function() {
    //SchemaOrder.i18n("schemas.order");
    //Order.attachSchema(SchemaOrder);
});