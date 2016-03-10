/**
 * Created by Cristian Poley on 10/03/2016.
 */

Order = new Mongo.Collection("order");
Order.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "First Name",
        max: 200
    },
    surname: {
        type: String,
        label: "Last Name",
        max: 200
    },
    phone: {
        type: String,
        label: "Phone",
        max: 9
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email Address"
    },
    numberBrisboxers: {
        type: String,
        label: "Number Brisboxer"
    },
    zip: {
        type: String,
        label: "Hometown ZIP Code"
    },
    address: {
        type: String,
        label: "Address",
    },
    hours:{
        type: Number,
        label: "Hours"
    },
    tel:{
        type: String,
        label: "Telephone"
    }
}));