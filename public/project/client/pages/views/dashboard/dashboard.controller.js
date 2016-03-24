(function(){
	angular
		.module("SpiderMongo")
		.controller("DashBoardController", DashBoardController);

	function DashBoardController(ConnectionService, $location, $rootScope, UserService, sweet) {

		console.log("In Dashboard Controller");
		var vm = this;
        vm.enabledConnection = enabledConnection;
        vm.renderSiderbar = renderSiderbar;

		function init() {
			vm.$location = $location;
            getConnectionsForUser();
        }
        init();

        function getConnectionsForUser() {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    ConnectionService.findAllConnectionForUserId(currentUser.username).then(
                        function(response) {
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



        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

		
	}
})();