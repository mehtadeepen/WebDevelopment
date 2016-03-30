/**
 * Created by dmehta on 3/29/16.
 */
"use strict"
var mongoose = require("mongoose");

module.exports = function () {

    var OptionSchema = require("./option.schema.server.js")();

    var FieldSchema = mongoose.Schema({
        label: {
            type: String,
            required: 'Field Label is required',
            default: "Default label"
        },
        type: {
            type: String,
            required: 'Type Name is required',
            enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES', 'TEXTAREA']
        },
        placeholder: {
            type: String
        },
       options:[OptionSchema]
    });

    return FieldSchema;
};