/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
var HashMap = require('hashmap');

module.exports = function(app,db,mongoose,mongojs) {

    //var mongoJSDB = mongojs('mongodb://admin:admin@ds015869.mlab.com:15869/spidermongo');
    //
    //mongoJSDB.getCollectionNames(function(err,doc) {
    //    console.log(doc);
    //});

    //HashMap of live connection
    var liveConnection = new HashMap();

    //models
    var userModel    = require("./models/user.model.server.js")(db,mongoose);
    var connectionMetaModel = require("./models/connection.model.server.js")(db,mongoose);
    var externalConnectorModel = require("./models/external.connector.model.server.js")(mongojs);


    //services
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var connectionMetaService = require("./services/connection.service.server.js")(app,userModel,connectionMetaModel,externalConnectorModel,liveConnection);

}