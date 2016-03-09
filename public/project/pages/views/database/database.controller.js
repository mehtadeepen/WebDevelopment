(function(){
	angular
		.module("SpiderMongo")
		.controller("DatabaseController", DatabaseController);

	function DatabaseController() {
		
		var vm = this

		vm.renderSiderbar = renderSiderbar;

		function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

		function init() {

		}

		init();
	}
})();