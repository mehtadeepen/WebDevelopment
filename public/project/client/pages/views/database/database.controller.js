(function(){
	angular
		.module("SpiderMongo")
		.controller("DatabaseController", DatabaseController);

	function DatabaseController($rootScope) {
		
		var vm = this

		vm.renderSiderbar = renderSiderbar;

		function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

		function init() {

		}



		init();

		if($rootScope.user === undefined) {
			$location.url("/")
		}
	}
})();