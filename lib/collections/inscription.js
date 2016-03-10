/**
 * Created by FranciscoJavier on 08/03/2016.
 */

Inscription = new Mongo.Collection("inscription");
Schema = new SimpleSchema({
    name: {
        type: String,
        max: 200
    },
    surname: {
        type: String,
        max: 200
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String
    },
    confirmPass: {
        type: String
    },
    zip: {
        type: String
    },
    emailSchool: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    howHearAboutUs: {
        type: String,
        optional: true
    },
    image: {
        type: String
    }
    //TODO : Contractor Agreement check.
});

Meteor.startup(function() {
    Schema.i18n("schemas.inscription");
    Inscription.attachSchema(Schema);
});