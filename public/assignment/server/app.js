module.exports = function(app,uuid,db,mongoose,userModel, securityService) {


    var formModel   = require("./models/form.model.server.js")(db,mongoose);
    var fieldModel = require("./models/field.model.server")(formModel,mongoose);


    var userService  = require("./services/user.service.server.js")(app, formModel, userModel, securityService);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}