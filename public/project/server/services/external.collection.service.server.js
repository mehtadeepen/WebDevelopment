/**
 * Created by dmehta on 3/23/16.
 */
"use strict";
module.exports = function (app,liveConnection,collectionsMap, externalConnectorModel) {
    app.get("/api/spidermongo/cloud/collections/:userId",getListOfCollections);
    app.post("/api/spidermongo/cloud/collections/:userId",createCollectionForUser);
    app.post("/api/spidermongo/cloud/documents/:userId",getAllDocumentsForDatabase);
    app.post("/api/spidermongo/cloud/search/documents/:userId", findDocumentsFromCollectionForUser);


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