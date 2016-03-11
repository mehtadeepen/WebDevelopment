(function(){
	angular
		.module("SpiderMongo")
		.controller("DashBoardController", DashBoardController);

	function DashBoardController(ConnectionService, $location, $rootScope) {

		console.log("In Dashboard Controller");
		var vm = this;
        vm.renderSiderbar = renderSiderbar;

		vm.doConnect = doConnect;

		function init() {

			vm.$location = $location;
        	 
        }
        init();
        if($rootScope.user === undefined) {
            $location.url("/")
        }
		getEnabledConnectionForUser();

        function getEnabledConnectionForUser() {
            console.log("Get all connection for user");
            ConnectionService.findAllEnabledConnectionForUserId("guest", function (connectionsById) {
                vm.connections = connectionsById;
                $rootScope.enabledConnections = connectionsById;
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

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }
		
	}
})();