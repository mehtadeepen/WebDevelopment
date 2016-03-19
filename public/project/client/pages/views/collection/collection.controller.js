(function(){
	angular
		.module("SpiderMongo")
		.controller("CollectionController", CollectionController);

	function CollectionController($rootScope) {

		if($rootScope.user === undefined) {
			$location.url("/")
		}

		
	}
})();