(function() {

	angular
	.module("FormBuilderApp")
	.controller("MainController", MainController);



	function MainController($scope, $location, $rootScope){
		$scope.$location = $location;

		$scope.logout = logout;


		function logout(user) {

		delete $rootScope.user;
		 $location.url("/")

	}

	}

	

})();