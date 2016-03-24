"use strict";
(function() {

    angular
        .module("SpiderMongo")
        .factory("CollectionService", CollectionService);

    function CollectionService($http) {


        var api = {

            findAllCollectionsForUser : findAllCollectionsForUser,
            createCollectionForUSer: createCollectionForUSer,
            getAllDocumentsForDatabase: getAllDocumentsForDatabase
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

    }


})();