(function(){
	angular
		.module("SpiderMongo")
		.controller("SideBarController", SideBarController);

	function SideBarController(ConnectionService, CollectionService, $location, $rootScope) {

        console.log("In Sidebar Controller");
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout(user) {
            delete $rootScope.user;
            delete $rootScope.isConnected;
            delete $rootScope.connectedTo;
            $location.url("/login")
        }

	}




})();