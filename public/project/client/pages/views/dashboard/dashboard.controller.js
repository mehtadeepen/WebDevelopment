(function(){
	angular
		.module("SpiderMongo")
		.controller("DashBoardController", DashBoardController);

	function DashBoardController(ConnectionService, $location, $rootScope, UserService) {

		console.log("In Dashboard Controller");
		var vm = this;
        vm.enabledConnection = enabledConnection;


        vm.renderSiderbar = renderSiderbar;

		vm.doConnect = doConnect;
        vm.doDisonnect = doDisonnect;

		function init() {

			vm.$location = $location;
            getConnectionsForUser();
        }
        init();

        var loggedInUser = $rootScope.projectUser;

        function getConnectionsForUser() {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    ConnectionService.findAllConnectionForUserId(currentUser.username).then(
                        function(response) {
                            //ConnectionService.setConnections(response.data);
                            vm.allConnections = response.data;
                        }, function (error) {
                            console.log(error);
                        });
                }, function(error){
                    console.log(error);
                });
        }

        function enabledConnection (connection) {
            return connection.enabled;
        }

        function doConnect(connectionID) {

            console.log(connectionID);
            ConnectionService.doConnectById(loggedInUser.username,connectionID , function(connection) {
                console.log(connection);
                $rootScope.isConnected = true;
                $rootScope.connectedTo = connection;
                console.log("connection successful");              
                $location.url('/database');

            });
        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

        function doDisonnect(connectionID) {
            console.log(connectionID);
            ConnectionService.doDisConnectById(loggedInUser.username,connectionID , function(connection) {
                console.log(connection);
                $rootScope.isConnected = false;
                $rootScope.connectedTo = null;
                console.log("dis connection successful");
                $location.url('/dashboard');
            });

        }
		
	}
})();