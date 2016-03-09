(function(){
	angular
		.module("SpiderMongo")
		.controller("ConnectionController", ConnectionController);

	function ConnectionController($location, ConnectionService, $routeParams, $rootScope) {

         console.log("In Connection Controller");
		var vm = this;
        var connectionID = $routeParams.ID;

        vm.addConnection = addConnection;
        vm.editConnection = editConnection;
        vm.updateConnection = updateConnection;
        vm.doConnect = doConnect;
        vm.doDisonnect = doDisonnect;
        vm.deleteConnection = deleteConnection;
        vm.enableConnection = enableConnection;
        vm.disableConnection = disableConnection;
        vm.renderSiderbar = renderSiderbar;
        

        function init() {

        	 vm.$location = $location;
        }
        init();
        getConnectionForUser();
        editConnection(connectionID);
        getEnabledConnectionForUser();

        function getEnabledConnectionForUser() {
            ConnectionService.findAllEnabledConnectionForUserId("guest", function (connectionsById) {
                $rootScope.enabledConnections = connectionsById;
            });

        }

        function addConnection(connection) {

        	if(connection == undefined || !connection.hasOwnProperty("name") || connection.name.trim() === "") {
                return;
            }
            
        	console.log(connection);

        	var exist = ConnectionService.findAllConnectionsForUserIdByName("guest",connection);

            if (exist === -1) {
                alert("Connection already exits");
            }  else {
                
                ConnectionService.createConnectionForUserId("guest", connection, function(newConnection) {               
                
                $location.url('/connections');
            
            });
            }
            
        }

        function editConnection(connectionID) {

                console.log(connectionID);
                ConnectionService.findConnectionById(connectionID, function (newConnection) {
                console.log(newConnection[0]);
                vm.connection = newConnection[0];

            });
        }


        function updateConnection(connection) {

                console.log(connection);
                ConnectionService.updateConnectionById(connection._id,connection, function (newConnection) {

                    console.log(newConnection);
                    $location.url('/connections');
                });
            
        }

        function doConnect(connectionID) {

            console.log(connectionID);
            ConnectionService.doConnectById("guest",connectionID , function(connection) {
                console.log(connection);
                $rootScope.isConnected = true;
                $rootScope.connectedTo = connection;
                console.log("connection successful");              
                $location.url('/connections');

            });
        }

        function doDisonnect(connectionID) {
            console.log(connectionID);
            ConnectionService.doDisConnectById("guest",connectionID , function(connection) {
                console.log(connection);
                $rootScope.isConnected = false;
                $rootScope.connectedTo = null;
                console.log("dis connection successful");              
                $location.url('/connections');
            });

        }


        function deleteConnection(connectionID) {
            console.log(connectionID);
            ConnectionService.deleteConnectionById(connectionID , function(connections) {
                console.log(connections);
                console.log("deleteConnection successful");              
                vm.connections = connections;
                getEnabledConnectionForUser();
            });

        }

        function disableConnection(connectionID) {
            console.log(connectionID);
            ConnectionService.disableConnectionById("guest",connectionID , function(connections) {
                console.log(connections);
                console.log("disableConnection successful");              
                vm.connections = connections;
                getEnabledConnectionForUser();
            });

        }

        function enableConnection(connectionID) {
            console.log(connectionID);
            ConnectionService.enableConnectionById("guest",connectionID , function(connections) {
                console.log(connections);
                console.log("enableConnection successful");              
                vm.connections = connections;
                getEnabledConnectionForUser();
            });

        }
        

        function getConnectionForUser() {
            console.log("Get all connection for user");
            ConnectionService.findAllConnectionForUserId("guest", function (connectionsById) {
                vm.connections = connectionsById;
            });

        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }
		
	}
})();