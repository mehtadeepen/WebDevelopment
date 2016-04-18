/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        app: {
            type: String,
            default : "spidermongo"
        }
    }, {collection: 'spidermongo.user'});
    return UserSchema;
};