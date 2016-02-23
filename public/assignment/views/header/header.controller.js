"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope){

        $scope.isLoggedIn = isLoggedIn;
        $scope.logout = logout;

        function isLoggedIn() {
            return ($location.url() != '/home' && $location.url() != '/login' && $location.url() != '/register');
        }

        function logout(user) {

        	delete $rootScope.user;
        	$location.url("/")
        }

    }

})();