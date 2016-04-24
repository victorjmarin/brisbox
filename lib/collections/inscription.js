/**
 * Created by FranciscoJavier on 08/03/2016.
 */

Inscription = new Mongo.Collection("inscription");
SchemaInscription = new SimpleSchema({
    username: {
        type: String,
        max: 30
    },
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
        regEx: /([0-9]{9})/
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        custom: function () {
            var upo = new RegExp("alu.upo.es");
            var us = new RegExp("alum.us.es");
            if ((upo.test(this.value) == false) && (us.test(this.value) == false)) {
                return "emailNotStudent";
            }
        }
    },
    password: {
        type: String
    },
    confirmPass: {
        type: String,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "wrongPassword";
            }
        }
    },
    zip: {
        type: String,
        custom: function () {
            var zipResult = Zips.findOne({code: this.value});
            if (zipResult == null) {
                return "wrongZip";
            }
        }
    },
    howHearAboutUs: {
        type: String,
        optional: true
    },
    image: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                previewTemplate: 'imagePreview'
            }
        }
    }
});

Meteor.startup(function () {
    SchemaInscription.i18n("schemas.inscription");
    Inscription.attachSchema(SchemaInscription);
});
