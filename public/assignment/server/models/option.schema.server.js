/**
 * Created by dmehta on 3/29/16.
 */
"use strict";
var mongoose = require("mongoose");
module.exports = function () {

    var OptionSchema = mongoose.Schema({
        label: {
            type: String
        },
        value: {
            type: String
        }
    });
    return OptionSchema;
};


