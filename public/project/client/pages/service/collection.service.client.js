"use strict";
(function() {

    angular
        .module("SpiderMongo")
        .factory("CollectionService", CollectionService);

    function CollectionService($http) {


        var api = {

            findAllCollectionsForUser : findAllCollectionsForUser,
            createCollectionForUSer: createCollectionForUSer,
            getAllDocumentsForDatabase: getAllDocumentsForDatabase,
            findDocumentsFromCollectionForUser: findDocumentsFromCollectionForUser,
            insertDocumentInCollectionForUser: insertDocumentInCollectionForUser,
            getDocumentFromCollectionForUser: getDocumentFromCollectionForUser,
            updateDocumentInCollectionForUser: updateDocumentInCollectionForUser,
            deleteDocumentFromCollectionForUser: deleteDocumentFromCollectionForUser
        };

        return api;

        function findAllCollectionsForUser(username) {
            console.log("In client :: Collection Service :: findAllCollectionsForUser",username);
            return $http.get("/api/spidermongo/cloud/collections/"+username);
        }

        function createCollectionForUSer(username,collectionName) {
            console.log("In client :: Collection Service :: createCollectionForUSer",username,collectionName);
            var name = {
                collection : collectionName
            };
            return $http.post("/api/spidermongo/cloud/collections/"+username,name);
        }

        function getAllDocumentsForDatabase(username,collectionName) {
            console.log("In client :: Collection Service :: getAllDocumentsForDatabase",username,collectionName);
            var name = {
                collection : collectionName
            };
            return $http.post("/api/spidermongo/cloud/documents/"+username, name);
        }

        function findDocumentsFromCollectionForUser(username,collectionName,search) {
            console.log("In client :: Collection Service :: getAllDocumentsForDatabase",username,collectionName);
            if(search) {
                if(search.key != "all") {
                    search.collectionName = collectionName;
                    return $http.post("/api/spidermongo/cloud/search/documents/"+username, search);
                } else {
                    var name = {
                        collection : collectionName
                    };
                    return $http.post("/api/spidermongo/cloud/documents/"+username, name);
                }
            }  else {
                var name = {
                    collection : collectionName
                };
                return $http.post("/api/spidermongo/cloud/documents/"+username, name);
            }


        }

        function insertDocumentInCollectionForUser(username,collectionName,document) {
            console.log("In client :: Collection Service :: getAllDocumentsForDatabase",username,collectionName,document);
            return $http.post("/api/spidermongo/cloud/addDocument/"+collectionName+"/collection/"+username,document);
        }

        function getDocumentFromCollectionForUser(username,collectionName,documentId) {
            console.log("In client :: Collection Service :: getDocumentFromCollectionForUser",username,collectionName,documentId);
            var documentID = {
                _id : documentId
            };
            return $http.post("/api/spidermongo/cloud/getDocument/"+collectionName+"/collection/"+username,documentID);
        }


        function updateDocumentInCollectionForUser(username,collectionName,document,documentId) {
            console.log("In client :: Collection Service :: updateDocumentInCollectionForUser",username,collectionName,documentId);
            var meta = {
                oid : {
                    _id : documentId
                },
                document : document
            };
            return $http.post("/api/spidermongo/cloud/updateDocument/"+collectionName+"/collection/"+username,meta);
        }

        function deleteDocumentFromCollectionForUser(username,collectionName,documentId) {
            console.log("In client :: Collection Service :: deleteDocumentFromCollectionForUser",username,collectionName,documentId);
            var documentID = {
                _id : documentId
            };
            return $http.post("/api/spidermongo/cloud/deleteDocument/"+collectionName+"/collection/"+username,documentID);
        }
    }


})();