(function(){
	angular
		.module("SpiderMongo")
		.controller("CollectionController", CollectionController);

	function CollectionController($rootScope) {

		if($rootScope.projectUser === undefined) {
			$location.url("/")
		}

		
	}
})();