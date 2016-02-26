(function(){
	angular
		.module("SpiderMongo")
		.controller("SideBarController", SideBarController);

	function SideBarController() {
		$("#side-menu").metisMenu();
	}

	
})();