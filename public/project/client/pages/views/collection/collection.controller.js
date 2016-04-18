(function(){
	angular
		.module("SpiderMongo")
		.controller("CollectionController", CollectionController);

	function CollectionController(CollectionService, $routeParams, $location, UserService, sweet) {

		var vm = this;
		vm.notSystem = notSystem;
		vm.createCollection = createCollection;


		function init() {
			vm.$location = $location;
			vm.database = $routeParams.databaseName;
			getCollectionsForUser();
			CollectionService.setDatabase(vm.database);
		}
		init();

		function createCollection(collectionName) {
			UserService.getCurrentUser().then(
				function(response){
					if(checkCollectionExist(collectionName)) {
						sweet.show("Collection Already Exists !!",'error');
						vm.collectionName = "";
						return;
					}
					var currentUser = response.data;
					CollectionService.createCollectionForUSer(currentUser.username,collectionName).then(
						function(response) {
							console.log(response.data);
							vm.collections = response.data;
							sweet.show({
								title: 'Amazing',
								text: 'Collection created Successfully.',
								timer: 3000,
								type: 'success',
								showConfirmButton: false
							});
							vm.collectionName = "";
						}, function (error) {
							console.log(error);
							sweet.show('Oops...', error.data.message , 'error');
						});
				}, function(error){
					console.log(error);
					sweet.show('Oops...', error.data.message , 'error');
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
							sweet.show('Oops...', 'Problem fetching list of collection' , 'error');
						});
				}, function(error){
					console.log(error);
				});
		}

		function checkCollectionExist(collectionName) {
			for(var i in vm.collections) {
				if (vm.collections[i].name === collectionName) {
					return true;
				}
			}
			return false;
		}
	}
})();