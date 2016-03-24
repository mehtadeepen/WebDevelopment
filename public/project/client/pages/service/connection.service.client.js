"use strict";
(function() {

    angular
    .module("SpiderMongo")
    .factory("ConnectionService", ConnectionService);

    function ConnectionService($http, $rootScope) {


        var api = {

            findAllConnectionForUserId : findAllConnectionForUserId,
            deleteConnectionById : deleteConnectionById,
            addConnectionMeta: addConnectionMeta,
            setConnections: setConnections,
            findConnectionById: findConnectionById,
            updateConnectionById : updateConnectionById,
            doConnectionById : doConnectionById,
            doDisConnectById: doDisConnectById,
            disableConnectionById: disableConnectionById,
            enableConnectionById: enableConnectionById,
            checkConnected: checkConnected,
            setConnected: setConnected,
            setConnectedTo: setConnectedTo,
            getConnectedTo: getConnectedTo
        };

        return api;

        function getConnectedTo() {
            return $rootScope.connectedTo;
        }

        function setConnectedTo(connection) {
            $rootScope.connectedTo = connection;
        }

        function setConnected(val) {
            $rootScope.isConnected = val;
        }

        function checkConnected(username) {
            console.log("In client :: Connection Service :: checkConnected",username);
            return $http.get("/api/spidermongo/checkconnected/connections/user/"+username);
        }

        function deleteConnectionById(connectionId) {
            console.log("In client :: Connection Service :: deleteConnectionById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/delete/"+connectionId);
        }

        function enableConnectionById(connectionId) {
            console.log("In client :: Connection Service :: enableConnectionById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/enable/"+connectionId);
        }

        function disableConnectionById(connectionId) {
            console.log("In client :: Connection Service :: disableConnectionById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/disable/"+connectionId);
        }

        function doDisConnectById(connectionId) {
            console.log("In client :: Connection Service :: doDisConnectById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/disconnect/"+connectionId);
        }

        function doConnectionById(connectionId) {
            console.log("In client :: Connection Service :: doConnectionById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/connect/"+connectionId);
        }

        function updateConnectionById(newConnection) {
            console.log("In client :: Connection Service :: updateConnectionById",newConnection);
            return $http.put("/api/spidermongo/connectionmeta/connections/update/",newConnection);
        }

        function findConnectionById(connectionId) {
            console.log("In client :: Connection Service :: findConnectionById",connectionId);
            return $http.get("/api/spidermongo/connectionmeta/connection/"+connectionId);
        }

        function findAllConnectionForUserId(username) {
            console.log("In client :: Connection Service :: findAllConnectionForUserId",username);
            return $http.get("/api/spidermongo/connectionmeta/connections/user/"+username);
        }

        function setConnections(connections) {
            $rootScope.connections = connections;
        }

        function addConnectionMeta(username,connection) {
            console.log("In client :: Connection Service :: addConnectionMeta",username,connection);
            return $http.post("/api/spidermongo/connectionmeta/connections/add/"+username,connection);
        }

    }


})();