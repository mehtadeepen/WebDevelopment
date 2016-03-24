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
            findDocumentsFromCollectionForUser: findDocumentsFromCollectionForUser
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
    }


})();