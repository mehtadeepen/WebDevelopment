(function(){
	angular
		.module("SpiderMongo")
		.controller("CollectionController", CollectionController);

	function CollectionController(CollectionService, $routeParams, $location, UserService) {

		var vm = this;
		vm.notSystem = notSystem;
		vm.createCollection = createCollection;


		function init() {
			vm.$location = $location;
			getCollectionsForUser();
		}
		init();

		function createCollection(collectioName) {
			UserService.getCurrentUser().then(
				function(response){
					var currentUser = response.data;
					CollectionService.createCollectionForUSer(currentUser.username,collectioName).then(
						function(response) {
							console.log(response.data);
							vm.collections = response.data;
						}, function (error) {
							console.log(error);
						});
				}, function(error){
					console.log(error);
				});
		}

		function notSystem(collection) {
			var collectionName = collection.name;
			return !(collectionName.indexOf("system") > -1);
		}

		function getCollectionsForUser(){
			UserService.getCurrentUser().then(
				function(response){
					var currentUser = response.data;
					CollectionService.findAllCollectionsForUser(currentUser.username).then(
						function(response) {
							//ConnectionService.setConnections(response.data);
							console.log(response.data);
							vm.collections = response.data;
							vm.database = $routeParams.databaseName;
						}, function (error) {
							console.log(error);
						});
				}, function(error){
					console.log(error);
				});
		}
	}
})();