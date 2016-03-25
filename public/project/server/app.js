/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
var HashMap = require('hashmap');

module.exports = function(app,db,mongoose,mongojs) {

    //HashMap of live connection
    var liveConnection = new HashMap();
    var collectionsMap = new HashMap();

    //models
    var userModel    = require("./models/user.model.server.js")(db,mongoose);
    var connectionMetaModel = require("./models/connection.model.server.js")(db,mongoose);
    var externalConnectorModel = require("./models/external.connector.model.server.js")(mongojs);


    //services
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var connectionMetaService = require("./services/connection.service.server.js")(app,userModel,connectionMetaModel,externalConnectorModel,liveConnection,collectionsMap);
    var externalCollectionService = require("./services/external.collection.service.server.js")(app,liveConnection,collectionsMap, externalConnectorModel);
    var dashboardService = require("./services/dashboard.service.server")(app, connectionMetaModel, externalConnectorModel);
}