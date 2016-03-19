/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
module.exports = function(app,db,mongoose,mongojs) {

    var mongoJSDB = mongojs('mongodb://admin:admin@ds015869.mlab.com:15869/spidermongo');

    mongoJSDB.getCollectionNames(function(err,doc) {
        console.log(doc);
    });

    var userModel    = require("./models/user.model.server.js")(db,mongoose);


    var userService  = require("./services/user.service.server.js")(app, userModel);

}