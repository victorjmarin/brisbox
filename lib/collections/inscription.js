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
    /**email: {
        type: Email,
        label: "Email Address"
    },
    password: {
        type: password,
        label: "Password"
    },
    confirmPass: {
        type: password,
        label: "Confirm Password"
    },
    zip: {
        type: Number,
        max: 5,
        label: "Hometown ZIP Code"
    },
    emailSchool: {
        type: Email,
        label: "Your School's Email"
    },
    howHearAboutUs: {
        type: String,
        label: "How did you hear about EstuForce?"
    } **/
    //TODO : Contractor Agreement check.
    //TODO: Profile Image.
}));