(function(){
	angular
		.module("SpiderMongo")
		.controller("DashBoardController", DashBoardController);

	function DashBoardController(ConnectionService, $location, $rootScope) {

		console.log("In Dashboard Controller");
		var vm = this;

		vm.doConnect = doConnect;

		function init() {

			vm.$location = $location;
        	 
        }
        init();
		getConnectionForUser();

        function getConnectionForUser() {
            console.log("Get all connection for user");
            ConnectionService.findAllEnabledConnectionForUserId("guest", function (connectionsById) {
                vm.connections = connectionsById;
            });

        }

        function doConnect(connectionID) {

            console.log(connectionID);
            ConnectionService.doConnectById("guest",connectionID , function(connection) {
                console.log(connection);
                $rootScope.isConnected = true;
                $rootScope.connectedTo = connection;
                console.log("connection successful");              
                $location.url('/database');

            });
        }
		
	}
})();