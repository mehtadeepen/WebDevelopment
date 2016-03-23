/**
 * Created by dmehta on 3/18/16.
 */
"use strict";
// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var ConnectionMetaSchema = require("../schemas/connectionmeta.schema.server.js")(mongoose);

    // create user model from schema
    var ConnectionMetaModel = mongoose.model('spidermongo.connectionmeta', ConnectionMetaSchema);

    var api = {

        addConnectionMeta: addConnectionMeta,
        findConnectionForUser: findConnectionForUser,
        findConnectionById: findConnectionById,
        updateConnectionById: updateConnectionById,
        getConnectionString: getConnectionString,
        setConnected: setConnected,
        disConnectById: disConnectById,
        disableConnectionById: disableConnectionById,
        enableConnectionById: enableConnectionById,
        deleteConnectionById: deleteConnectionById
    };
    return api;

    function addConnectionMeta(connectionMeta) {
        console.log("In project :: Connection Meta Model :: addConnectionMeta",connectionMeta);
        var deferred = q.defer();

        ConnectionMetaModel.create(connectionMeta, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findConnectionForUser(userId) {
        console.log("In project :: Connection Meta Model :: findConnectionForUser",userId);
        var deferred = q.defer();

        ConnectionMetaModel.find({userId : userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findConnectionById(connectionId) {

        console.log("In project :: Connection Meta Model :: findConnectionById",connectionId);
        var deferred = q.defer();

        ConnectionMetaModel.findById(connectionId, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateConnectionById(connection) {

        console.log("In project :: Connection Meta Model :: updateConnectionById",connection);
        var deferred = q.defer();

        ConnectionMetaModel.update(
            {_id: connection._id},
            {$set: connection},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        // return a promise
        return deferred.promise;
    }

    function setConnected(connectionId) {

        console.log("In project :: Connection Meta Model :: setConnected",connectionId);
        var deferred = q.defer();


        ConnectionMetaModel.findById(connectionId,
            function (err, doc){

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    console.log(doc);
                    doc.connected = true;
                    doc.save(function(error){
                        if (error) {
                            console.log(error);
                            deferred.reject(err);
                        }else {
                            deferred.resolve(doc);
                        }

                    });

                }
            });
        return deferred.promise;
    }

    function disConnectById(connectionId) {
        console.log("In project :: Connection Meta Model :: disConnectById",connectionId);
        var deferred = q.defer();


        ConnectionMetaModel.findById(connectionId,
            function (err, doc){

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    console.log(doc);
                    doc.connected = false;
                    doc.save(function(error){
                        if (error) {
                            console.log(error);
                            deferred.reject(err);
                        }else {
                            deferred.resolve(doc);
                        }

                    });

                }
            });
        return deferred.promise;
    }

    function disableConnectionById(connectionId) {
        console.log("In project :: Connection Meta Model :: disableConnectionById",connectionId);
        var deferred = q.defer();


        ConnectionMetaModel.findById(connectionId,
            function (err, doc){

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    console.log(doc);
                    doc.enabled = false;
                    doc.save(function(error){
                        if (error) {
                            console.log(error);
                            deferred.reject(err);
                        }else {
                            deferred.resolve(doc);
                        }

                    });

                }
            });
        return deferred.promise;
    }

    function enableConnectionById(connectionId) {
        console.log("In project :: Connection Meta Model :: enableConnectionById",connectionId);
        var deferred = q.defer();


        ConnectionMetaModel.findById(connectionId,
            function (err, doc){

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    console.log(doc);
                    doc.enabled = true;
                    doc.save(function(error){
                        if (error) {
                            console.log(error);
                            deferred.reject(err);
                        }else {
                            deferred.resolve(doc);
                        }

                    });

                }
            });
        return deferred.promise;
    }


    function getConnectionString(connection) {
        console.log("In project :: Connection Meta Model :: getConnectionString",connection);
        var str = "mongodb://"+connection.username+":"
                                +connection.password+"@"
                                +connection.host+":"
                                +connection.port+"/"
                                +connection.database
                                ;
        console.log("Generating String ....");
        console.log(str);
        return str;
    }

    function deleteConnectionById(connectionId) {
        console.log("In project :: Connection Meta Model :: deleteConnectionById",connectionId);
        var deferred = q.defer();


        ConnectionMetaModel.remove({_id:connectionId},
            function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }


            });

        return deferred.promise;
    }

}