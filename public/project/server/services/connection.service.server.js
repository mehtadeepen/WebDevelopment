/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
module.exports = function(app, userModel, connectionMetaModel, externalConnectorModel,liveConnection, collectionsMap) {
    app.post("/api/spidermongo/connectionmeta/connections/add/:username",addConnectionMeta);
    app.get("/api/spidermongo/connectionmeta/connections/user/:username",findConnectionForUser);
    app.get("/api/spidermongo/connectionmeta/connection/connect/:connectionId",doConnectionById);
    app.get("/api/spidermongo/connectionmeta/connection/disconnect/:connectionId",doDisConnectById);
    app.get("/api/spidermongo/connectionmeta/connection/disable/:connectionId",disableConnectionById);
    app.get("/api/spidermongo/connectionmeta/connection/enable/:connectionId",enableConnectionById);
    app.get("/api/spidermongo/connectionmeta/connection/delete/:connectionId",deleteConnectionById);
    app.get("/api/spidermongo/connectionmeta/connection/:connectionId",findConnectionById);
    app.put("/api/spidermongo/connectionmeta/connections/update/",updateConnectionById);

    function deleteConnectionById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: deleteConnectionById",connectionId);
        connectionMetaModel.deleteConnectionById(connectionId).then(
            function (doc) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function enableConnectionById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: enableConnectionById",connectionId);
        connectionMetaModel.enableConnectionById(connectionId).then(
            function (doc) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function disableConnectionById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: disableConnectionById",connectionId);
        connectionMetaModel.disableConnectionById(connectionId).then(
            function (doc) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function doDisConnectById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: doDisConnectById",connectionId);
        connectionMetaModel.disConnectById(connectionId).then(
            function (userId) {
                res.send(200);
                var db = liveConnection.get(userId);
                if(db) {
                    db.close();
                }
                liveConnection.remove(userId);
                collectionsMap.remove(userId);
            }, function (error) {
                res.status(400).send(error);
        }
        );
    }

    function doConnectionById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: doConnectionById",connectionId);
        connectionMetaModel.findConnectionById(connectionId).then(
            function(connection) {
                var connectionString = connectionMetaModel.getConnectionString(connection);
                externalConnectorModel.getDBConnection(connectionString,connection.userId).then(
                    function (db) {
                        console.log("I am here 3");
                        var userID = connection.userId;
                        liveConnection.set(userID,db);
                        // Setting list of colletions to test
                        var getDb = liveConnection.get(userID);
                        getDb.listCollections().toArray(function(err, items) {
                            if(!err) {
                                collectionsMap.set(userID,items);
                            } else {
                                console.log("Error In fetching list of collections");
                                res.status(400).send(err);
                            }
                        });
                        connectionMetaModel.setConnected(connectionId).then(
                            function (connect) {
                                console.log("I am here 4");
                                res.json(connect);
                            }, function (err) {
                                liveConnection.remove(userID);
                                res.status(400).send(err);
                            }
                        );
                    }, function (error) {
                        console.log(error);
                        res.status(400).send(error);
                    }
                );

            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function updateConnectionById(req, res) {
        var newConnection = req.body;
        console.log("In project :: Connection Meta Service :: updateConnectionById",newConnection);
        connectionMetaModel.updateConnectionById(newConnection).then(
            function (connection) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function addConnectionMeta(req, res) {
        var connectionMeta = req.body;
        connectionMeta.userId = req.params.username;
        connectionMeta.enabled = true;
        connectionMeta.connected = false;
        console.log("In project :: Connection Meta Service :: addConnectionMeta",connectionMeta);
        connectionMetaModel.addConnectionMeta(connectionMeta).then(
            function (connection) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function findConnectionForUser(req, res) {
        var userId = req.params.username;
        console.log("In project :: Connection Meta Service :: findConnectionForUser",userId);
        connectionMetaModel.findConnectionForUser(userId).then(
          function(connections) {
              res.json(connections);
          }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function findConnectionById(req, res) {
        var connectionId = req.params.connectionId;
        console.log("In project :: Connection Meta Service :: findConnectionById",connectionId);
        connectionMetaModel.findConnectionById(connectionId).then(
            function(connection) {
                res.json(connection);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }
}