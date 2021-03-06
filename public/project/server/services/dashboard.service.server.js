/**
 * Created by dmehta on 3/23/16.
 */
"use strict";
module.exports = function (app,connectionMetaModel, externalConnectorModel) {
    app.get("/api/spidermongo/dashboard/user/:userId",loadDashboard);

    function loadDashboard(req, res) {
        var userId = req.params.userId;
        console.log("In project :: DashBoard Service :: loadDashboard",userId);
        connectionMetaModel.findConnectionForUser(userId).then(
            function (connections) {
                var connectionStrings = [];
                for(var c in connections) {
                    if(connections[c].enabled === true) {
                        var str = connectionMetaModel.getConnectionString(connections[c]);
                        connectionStrings.push(str);
                    }
                }
                externalConnectorModel.loadDashboard(connectionStrings).then(
                    function (dashboard) {
                        res.json(dashboard);
                    }
                );
            }, function (error) {
                console.log(error);
                res.status(400).send(error);
            }
        );
    }

}