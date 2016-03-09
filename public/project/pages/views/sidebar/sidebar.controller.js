(function(){
	angular
		.module("SpiderMongo")
		.controller("SideBarController", SideBarController);

	function SideBarController($scope, ConnectionService, $location, $rootScope) {
		$("#side-menu").metisMenu();

		 $scope.doConnect = doConnect;

		 $scope.$location = $location;

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