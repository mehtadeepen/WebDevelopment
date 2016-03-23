/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ConnectionMetaSchema = mongoose.Schema({
        name: String,
        username: String,
        password : String,
        host: String,
        port: String,
        database: String,
        "enabled" : Boolean,
        "connected" : Boolean,
        "userId" : String
    }, {collection: 'spidermongo.connectionmeta'});
    return ConnectionMetaSchema;
};