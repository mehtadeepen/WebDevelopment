module.exports = function(app,uuid) {
    var userModel    = require("./models/user.model.server.js")();
    var formModel   = require("./models/form.model.server.js")();

    var userService  = require("./services/user.service.server.js")(app, formModel, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, formModel, userModel, uuid);
}