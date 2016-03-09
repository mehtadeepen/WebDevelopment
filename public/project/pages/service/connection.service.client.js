"use strict";
(function() {

    angular
    .module("SpiderMongo")
    .factory("ConnectionService", ConnectionService);

    function ConnectionService() {

        var connections = [
        {
            "_id": "000", 
            "name": "Development", 
            "username": "dev", 
            "password" : "dev", 
            "host": "www.dev.com",
            "enabled" : true,
            "connected" : false,
            "userId" : "guest"
        },
        {
            "_id": "001", 
            "name": "Production", 
            "username": "prod", 
            "password" : "prod", 
            "host": "www.prod.com",
            "enabled" : true,
            "connected" : false,
            "userId" : "guest"
        },
        {
            "_id": "002", 
            "name": "Proxy", 
            "username": "proxy", 
            "password" : "proxy", 
            "host": "www.proxy.com",
            "enabled" : false,
            "connected" : false,
            "userId" : "guest"
        }];

        var api = {
            createConnectionForUserId : createConnectionForUserId,
            findAllConnectionForUserId : findAllConnectionForUserId,
            deleteConnectionById : deleteConnectionById,
            updateConnectionById : updateConnectionById,
            findAllConnectionsForUserIdByName : findAllConnectionsForUserIdByName,
            findConnectionById : findConnectionById,
            disconnectAll : disconnectAll,
            doConnectById : doConnectById,
            doDisConnectById : doDisConnectById,
            disableConnectionById : disableConnectionById,
            enableConnectionById : enableConnectionById,
            findAllEnabledConnectionForUserId : findAllEnabledConnectionForUserId
        };

        return api;

        function disconnectAll(userId) {

              for (var i = 0; i < connections.length; i++) {
                if(connections[i].userId === userId){
                    connections[i].connected = false;
                }
            }
        }


        function doConnectById(userId, connectionId, callback) {

            disconnectAll(userId);
            for (var i = 0; i < connections.length; i++) {
                if(connections[i].userId === userId && connections[i]._id === connectionId){
                    connections[i].connected = true;
                    break;
                }
            }

            callback(connections[i]);
        }

        function doDisConnectById(userId, connectionId, callback) {

            
            for (var i = 0; i < connections.length; i++) {
                if(connections[i].userId === userId && connections[i]._id === connectionId){
                    connections[i].connected = false;
                    break;
                }
            }

            callback(connections[i]);
        }
        

        function enableConnectionById(userId, connectionId, callback) {

            
            for (var i = 0; i < connections.length; i++) {
                if(connections[i].userId === userId && connections[i]._id === connectionId){
                    connections[i].enabled = true;
                    break;
                }
            }

            callback(connections);
        }


        function disableConnectionById(userId, connectionId, callback) {

            
            for (var i = 0; i < connections.length; i++) {
                if(connections[i].userId === userId && connections[i]._id === connectionId){
                    connections[i].enabled = false;
                    break;
                }
            }

            callback(connections);
        }

        function createConnectionForUserId(userId, connection, callback) {
            var id = (new Date).getTime();

            var newConnection = {
                "_id": id, 
                "name": connection.name,
                "username": connection.username, 
                "password" : connection.password, 
                "host": connection.host,
                "enabled" : true,
                "connected" : false,
                "userId" : userId
            };

            connections.push(newConnection);
            callback(newConnection);
        }

        function findAllConnectionForUserId(userId, callback) {

            var connectionsById = connections.filter(function(connection, index, arr){
                return (connection.userId === userId);
            });
            callback(connectionsById);
        }

        function findAllEnabledConnectionForUserId(userId, callback) {

            var connectionsById = connections.filter(function(connection, index, arr){
                return (connection.userId === userId && connection.enabled == true);
            });
            callback(connectionsById);
        }

        

        function findConnectionById(connectionId, callback) {

            console.log(connectionId);
            var connectionsById = connections.filter(function(connection, index, arr){
                return (connection._id === connectionId);
            });
            callback(connectionsById);
        }


        

        function findAllConnectionsForUserIdByName(userId, newConnection) {

            var name = newConnection.name;
            var host = newConnection.host;
            var connectionsByName = connections.filter(function(connection, index, arr){
                return (connection.userId === userId && 
                    (connection.name === name || connection.host === host));
            });

            console.log(connectionsByName);
            if(connectionsByName.length != 0) { 
                console.log("Connection already exists");
                return -1;
            } else {
                return 1;
            }
            
        }

        function deleteConnectionById(connectionId, callback) {

            var index = 0;
            var connectionIndex = -1;
            for (var i = 0; i < connections.length; i++) {
                if(connections[i]._id === connectionId){
                    connectionIndex = index;
                }
                index++;
            }
            if(connectionIndex != -1) {
                connections.splice(connectionIndex, 1);
                callback(connections);
            }
            
        }

        function updateConnectionById(connectionId, newConnection, callback) {
            var index = 0;
            var connectionIndex = -1;
            for (var i = 0; i < connections.length; i++) {
                if(connections[i]._id === connectionId){
                    connectionIndex = index;

                }
                
                index++;
            }

            if(connectionIndex != -1) {

                console.log("Index Number : "+connectionIndex);
                connections[connectionIndex] = {
                    "_id" : newConnection._id,
                    "name": newConnection.name,
                    "username": newConnection.username, 
                    "password" : newConnection.password, 
                    "host": newConnection.host,
                    "enabled" : true,
                    "connected" : false,
                    "userId" : newConnection.userId
                }
                console.log(connections);
                callback(connections[connectionIndex]);
            }
        }

    }


})();