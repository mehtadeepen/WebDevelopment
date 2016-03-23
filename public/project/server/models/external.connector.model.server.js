/**
 * Created by dmehta on 3/22/16.
 */
"use strict";
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(mongojs) {


    var api = {
        getDBConnection : getDBConnection
    };
    return api;

    function getDBConnection(connectionString,userId) {
        console.log("In project :: External Connector Model :: getDBConnection",connectionString,userId);
        var deferred = q.defer();
        var mongoJSDB = mongojs(connectionString);

        //mongoJSDB.stats(function (err , doc) {
        //    console.log(err);
        //    console.log(doc);
        //});

        //db.mycollection.save({created: 'just now'})
        mongoJSDB.runCommand({ping:1}, function(err, res) {
            if(!err && res.ok) {
                deferred.resolve(mongoJSDB);
            } else if (!res) {
                deferred.reject(err);
            }
        });

        return deferred.promise;


    }
}