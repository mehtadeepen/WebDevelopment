/**
 * Created by dmehta on 3/23/16.
 */
"use strict";
module.exports = function (app,liveConnection,collectionsMap, externalConnectorModel) {
    app.get("/api/spidermongo/cloud/collections/:userId",getListOfCollections);
    app.post("/api/spidermongo/cloud/collections/:userId",createCollectionForUser);
    app.post("/api/spidermongo/cloud/documents/:userId",getAllDocumentsForDatabase);
    app.post("/api/spidermongo/cloud/search/documents/:userId", findDocumentsFromCollectionForUser);
    app.post("/api/spidermongo/cloud/addDocument/:collectionName/collection/:userId",insertDocumentInCollectionForUser);
    app.post("/api/spidermongo/cloud/getDocument/:collectionName/collection/:userId",getDocumentFromCollectionForUser);
    app.post("/api/spidermongo/cloud/updateDocument/:collectionName/collection/:userId",updateDocumentInCollectionForUser);
    app.post("/api/spidermongo/cloud/deleteDocument/:collectionName/collection/:userId",deleteDocumentFromCollectionForUser);

    function deleteDocumentFromCollectionForUser(req, res) {
        var userId = req.params.userId;
        var collectionName = req.params.collectionName;
        var documentID = req.body;
        console.log("In project :: External Collection  Service :: deleteDocumentFromCollectionForUser", userId, collectionName, documentID);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.deleteDocumentFromCollectionForUser(db,collectionName,documentID).then(
                function (document) {
                    res.send(200);
                }, function (error) {
                    console.log("Error in deleting document by id",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function updateDocumentInCollectionForUser(req, res) {
        var userId = req.params.userId;
        var collectionName = req.params.collectionName;
        var meta = req.body;
        console.log("In project :: External Collection  Service :: updateDocumentInCollectionForUser", userId, collectionName, meta);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.updateDocumentInCollectionForUser(db,collectionName,meta).then(
                function (document) {
                    res.send(200);
                }, function (error) {
                    console.log("Error in inserting documents",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function getDocumentFromCollectionForUser(req, res) {
        var userId = req.params.userId;
        var collectionName = req.params.collectionName;
        var documentID = req.body;
        console.log("In project :: External Collection  Service :: getDocumentFromCollectionForUser", userId, collectionName, documentID);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.getDocumentFromCollectionForUser(db,collectionName,documentID).then(
                function (document) {
                    res.json(document);
                }, function (error) {
                    console.log("Error in finding document by id",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function insertDocumentInCollectionForUser(req, res) {
        var userId = req.params.userId;
        var collectionName = req.params.collectionName;
        var document = req.body;
        console.log("In project :: External Collection  Service :: insertDocumentInCollectionForUser", userId, collectionName, document);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.insertDocumentInCollectionForUser(db,collectionName,document).then(
                function (documents) {
                    res.send(200);
                }, function (error) {
                    console.log("Error in inserting documents",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function findDocumentsFromCollectionForUser(req, res) {
        var userId = req.params.userId;
        var search = req.body;
        console.log("In project :: External Collection  Service :: findDocumentsFromCollectionForUser", userId, search);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.findDocumentsFromCollectionForUser(db,search).then(
                function (documents) {
                    res.json(documents);
                }, function (error) {
                    console.log("Error in finding documents",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function getAllDocumentsForDatabase(req, res) {
        var userId = req.params.userId;
        var name = req.body;
        console.log("In project :: External Collection  Service :: getAllDocumentsForDatabase", userId, name.collection);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.getAllDocumentsForDatabase(db,name.collection).then(
                function (documents) {
                    res.json(documents);
                }, function (error) {
                    console.log("Error in fetching documents",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }

    function getListOfCollections(req, res) {
        var userId = req.params.userId;
        console.log("In project :: External Collection  Service :: getListOfCollections", userId);
        var listOfCollection = collectionsMap.get(userId);
        if(listOfCollection) {
            res.json(listOfCollection);
        } else if (listOfCollection.length == 0) {
            console.log("No Collection Found");
            res.json(listOfCollection);
        } else {
            res.send(null);
        }
    }

    function createCollectionForUser(req, res) {
        var userId = req.params.userId;
        var name = req.body;
        console.log("In project :: External Collection  Service :: createCollectionForUser", userId, name.collection);
        var db = liveConnection.get(userId);
        if(db) {
            externalConnectorModel.createCollectionForUser(db,name.collection).then(
                function (collections) {
                    res.json(collections);
                }, function (error) {
                    console.log("Error in creating collection",error);
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("Error in no live connection found for user", userId);
            res.status(400).send(null);
        }
    }
}