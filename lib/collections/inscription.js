/**
 * Created by FranciscoJavier on 08/03/2016.
 */

Inscription = new Mongo.Collection("inscription");
Inscription.attachSchema(new SimpleSchema({
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
    password: {
        type: String,
        label: "Password"
    },
    confirmPass: {
        type: String,
        label: "Confirm Password"
    },
   /** zip: {
        type: Number,
        max: 5,
        label: "Hometown ZIP Code"
    },**/
    emailSchool: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Your School's Email"
    },
    howHearAboutUs: {
        type: String,
        label: "How did you hear about EstuForce?",
        optional: true
    }
    //TODO : Contractor Agreement check.
    //TODO: Profile Image.
}));