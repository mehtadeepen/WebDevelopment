/**
 * Created by dmehta on 3/29/16.
 */
"use strict"
var mongoose = require("mongoose");


module.exports = function () {

    var FieldSchema = require("./field.schema.server")();

    var FormSchema = mongoose.Schema({
        userId: {
            type: String,
            required: 'UserId is required'
        },
        title: {
            type: String,
            required: 'Form Name is required'
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date
        },
        fields: [FieldSchema]
    }, {collection: 'assignment.form'});
    return FormSchema;
};