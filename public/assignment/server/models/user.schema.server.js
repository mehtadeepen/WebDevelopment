/**
 * Created by dmehta on 3/29/16.
 */
"use strict"
var mongoose = require("mongoose");
var validator = require('validator');


module.exports = function () {

    var validateEmail = function(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    };

    var validatePhone = function(phone) {
        console.log(/\d{3}-\d{3}-\d{4}/.test(phone));
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
    };

    var validateUsername = function(username) {
        return /^\w+$/.test(username);
    };

    var validateName = function(name) {
        return /^[a-zA-Z]*$/.test(name);
    };

    var validatePassword = function(password) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password);
    }


    var UserSchema = mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            validate: [validateUsername, 'Username should contain only letters, numbers and underscores']
        },
        password: {
            type : String,
            required: 'Password is required',
            validate: [validatePassword,  'Password should contain Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character']
            },
        email: [{
            type: String,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            }],
        firstName: {
            type: String,
            validate: [validateName,  'FirstName should have only letters']
        },
        lastName: {
            type: String,
            validate: [validateName,  'FirstName should have only letters']
        },
        roles: [{
            type: String
        }],
        phone:[{
            type: String,
            validate: [validatePhone,  'Phone number should be like 123-456-7890']
            }]
    }, {collection: 'assignment.user'});
    return UserSchema;



};
