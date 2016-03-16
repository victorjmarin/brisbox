/**
 * Created by FranciscoJavier on 08/03/2016.
 */

Inscription = new Mongo.Collection("inscription");
SchemaInscription = new SimpleSchema({
    name: {
        type: String,
        max: 200
    },
    surname: {
        type: String,
        max: 200
    },
    phone: {
        type: String,
        regEx: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String
    },
    confirmPass: {
        type: String,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return  "wrongPassword";
            }
        }
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
        type: String,
        optional: true
    }
    //TODO : Contractor Agreement check.
});

Meteor.startup(function() {
    SchemaInscription.i18n("schemas.inscription");
    Inscription.attachSchema(SchemaInscription);
});
