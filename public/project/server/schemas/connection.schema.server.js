/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ConnectionSchema = mongoose.Schema({
        name: String,
        host: String,
        port: String,
        username: String,
        password: String
    }, {collection: 'spidermongo.user'});
    return ConnectionSchema;
};