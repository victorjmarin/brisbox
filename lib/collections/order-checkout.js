/**
 * Created by Cristian Poley on 14/03/2016.
 */

OrderCheckout = new Mongo.Collection("orderCheckout");
SchemaOrderCheckout = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 200
    },
});