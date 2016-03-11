(function(){
	angular
		.module("SpiderMongo")
		.controller("SideBarController", SideBarController);

	function SideBarController(ConnectionService, $location, $rootScope) {

        console.log("In Sidebar Controller");
        var vm = this;


        vm.logout = logout;
        vm.doConnect = doConnect;

        function init() {

            vm.$location = $location;

        }
        init();

        $("#side-menu").metisMenu();





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


        function logout(user) {

            delete $rootScope.user;
            $location.url("/")
        }

	}



	
})();