/**
 * Created by FranciscoJavier on 08/03/2016.
 */

Inscription = new Mongo.Collection("inscription");
SchemaInscription = new SimpleSchema({
    username: {
        type: String,
        max: 30,
        unique: true //TODO: CATCH SERVER METEOR.ERROR AND SHOW ON VIEW --> http://es.discovermeteor.com/chapters/errors/
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
        regEx: SimpleSchema.RegEx.Email //TODO : VALIDATION FOR ONLY US OR UPO EMAILS
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
    contactEmail: {
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
    },
    checkTerms: {
        type: Boolean
        /**custom: function () {
            if (this.value == false){
                return "termsRequired";   // TODO: BUG ON CHECK VALUE. ITS VALUE IS ALWAYS 'TRUE'.
            }
        }**/
    }
});

Meteor.startup(function() {
    SchemaInscription.i18n("schemas.inscription");
    Inscription.attachSchema(SchemaInscription);
});
