/**
 * Created by dmehta on 3/22/16.
 */
"use strict";
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(mongojs) {


    var api = {
        getDBConnection : getDBConnection,
        createCollectionForUser: createCollectionForUser,
        getAllDocumentsForDatabase : getAllDocumentsForDatabase,
        findDocumentsFromCollectionForUser: findDocumentsFromCollectionForUser,
        insertDocumentInCollectionForUser : insertDocumentInCollectionForUser,
        getDocumentFromCollectionForUser: getDocumentFromCollectionForUser,
        updateDocumentInCollectionForUser : updateDocumentInCollectionForUser,
        deleteDocumentFromCollectionForUser: deleteDocumentFromCollectionForUser,
        loadDashboard: loadDashboard
    };
    return api;

    function deleteDocumentFromCollectionForUser(db,collectionName,documentID) {
        console.log("In project :: External Connector Model :: deleteDocumentFromCollectionForUser",collectionName,documentID);
        var deferred = q.defer();

        var collection = db.collection(collectionName);

        var ObjectId = require('mongodb').ObjectID;

        collection.findOneAndDelete({"_id": new ObjectId(documentID._id)}, function(err, r) {
            if(!err) {
                console.log(r);
                deferred.resolve(r);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function updateDocumentInCollectionForUser(db,collectionName,meta) {
        console.log("In project :: External Connector Model :: updateDocumentInCollectionForUser",collectionName,meta);
        var deferred = q.defer();

        var collection = db.collection(collectionName);

        var ObjectId = require('mongodb').ObjectID;

        collection.findOneAndReplace( {"_id": new ObjectId(meta.oid._id)}, meta.document,function(err, r) {

            if(!err) {
                    console.log("Replace Successful");
                    deferred.resolve(r);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getDocumentFromCollectionForUser(db,collectionName,documentID) {
        console.log("In project :: External Connector Model :: getDocumentFromCollectionForUser",collectionName,documentID);
        var deferred = q.defer();

        var collection = db.collection(collectionName);

        var ObjectId = require('mongodb').ObjectID;

        collection.findOne({"_id": new ObjectId(documentID._id)}, function(err, doc) {
            if(!err) {
                console.log(doc);
                deferred.resolve(doc);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function insertDocumentInCollectionForUser(db,collectionName,document) {
        console.log("In project :: External Connector Model :: getAllDocumentsForDatabase",collectionName,document);
        var deferred = q.defer();

        var collection = db.collection(collectionName);

        collection.insertOne(document, function(err, r) {
            if(!err) {
                if(r.insertedCount == 1) {
                    console.log("Insertion Successful");
                    deferred.resolve(r);
                } else {
                    console.log("Count Not equal to 1");
                    deferred.reject(r);
                }
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findDocumentsFromCollectionForUser(db,search) {
        console.log("In project :: External Connector Model :: getAllDocumentsForDatabase",search.collectionName);
        var deferred = q.defer();

        var collection = db.collection(search.collectionName);

        var query = {

        };
        query[search.key] = search.val;

        console.log("Find Query ......" , query);
        collection.find(query).toArray(function(err, docs) {
            if(!err) {
                deferred.resolve(docs);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getAllDocumentsForDatabase(db,collectionName) {
        console.log("In project :: External Connector Model :: getAllDocumentsForDatabase",collectionName);
        var deferred = q.defer();

        var collection = db.collection(collectionName);

        collection.find().toArray(function(err, docs) {
            if(!err) {
                deferred.resolve(docs);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function createCollectionForUser(db,collectionName) {
        console.log("In project :: External Connector Model :: createCollectionForUser",collectionName);
        var deferred = q.defer();

        db.createCollection(collectionName, {capped:true, size:10000, max:1000}, function(err, collection) {
            if (!err) {
                db.listCollections().toArray(function(error, items) {
                    if(!error) {
                        deferred.resolve(items);
                    } else {
                        console.log("Error In fetching list of collections");
                        deferred.reject(error);
                    }
                });
            } else {
                console.log("Error In creating collection");
                deferred.reject(err);
            }
        });
            return deferred.promise;
    }


    function getDBConnection(connectionString,userId) {
        console.log("In project :: External Connector Model :: getDBConnection",connectionString,userId);
        var deferred = q.defer();
        var MongoClient = require('mongodb').MongoClient
            , assert = require('assert');

        MongoClient.connect(connectionString, function(err, db) {
            if(!err) {
                deferred.resolve(db);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function loadDashboard(connectionStrings) {
        console.log("In project :: External Connector Model :: loadDashboard",connectionStrings);


        var numOfCollection = 0;
        var numOfConnection = connectionStrings.length;
        var numOfFailedConnection = 0;

        var promiseArray = [];
        var result = [];

        for(var s in connectionStrings) {
            var connectionString = connectionStrings[s];
            var MongoClient = require('mongodb').MongoClient
                , assert = require('assert');

            console.log("Connecting .....",connectionString);

            promiseArray.push(
                (
                function() {

                    var deferred  = q.defer();
                    MongoClient.connect(connectionString, function(err, db) {
                        if(!err) {
                            db.listCollections().toArray(function(error, items) {
                                if(!error) {
                                    var collection = {
                                        c : 1,
                                        n : items.length,
                                        f: 0
                                    };
                                    deferred.resolve(collection);
                                    db.close();
                                } else {
                                    console.log("Error In fetching list of collections for dashboard");
                                    var collection = {
                                        c : 1,
                                        n : 0,
                                        f: 0
                                    };
                                    deferred.resolve(collection);
                                    db.close();
                                }
                            });
                        } else {
                            var collection = {
                                c : 0,
                                n : 0,
                                f: 1
                            };
                            console.log(err);
                            deferred.resolve(collection);
                        }
                    });


                }
                ).then(function (res) {
                    result.push(res);
                })

            );


        }



        q.all(promiseArray).then(function(){
            console.log(result);
            return result;
        });
    }
}