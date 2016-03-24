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
        deleteDocumentFromCollectionForUser: deleteDocumentFromCollectionForUser
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
                        deferred.resolve(items)
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
       // var mongoJSDB = mongojs(connectionString);

        //mongoJSDB.stats(function (err , doc) {
        //    console.log(err);
        //    console.log(doc);
        //});

        var MongoClient = require('mongodb').MongoClient
            , assert = require('assert');


        // Use connect method to connect to the Server
        MongoClient.connect(connectionString, function(err, db) {
            if(!err) {
                deferred.resolve(db);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;


    }
}