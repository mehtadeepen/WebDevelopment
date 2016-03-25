(function(){
	angular
		.module("SpiderMongo")
		.controller("DashBoardController", DashBoardController);

	function DashBoardController(DashBoardService,ConnectionService, $location, $rootScope, UserService, sweet) {

		console.log("In Dashboard Controller");
		var vm = this;
        vm.enabledConnection = enabledConnection;
        vm.renderSiderbar = renderSiderbar;

		function init() {
			vm.$location = $location;
            getConnectionsForUser();
            //loadDashboard();
        }
        init();

        function loadDashboard(){
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    DashBoardService.loadDashboard(currentUser.username).then(
                        function(response) {
                            vm.dashboard = response.data;
                            console.log(vm.dashboard);
                        }, function (error) {
                            console.log(error);
                        });
                }, function(error){
                    console.log(error);
                });
        }

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