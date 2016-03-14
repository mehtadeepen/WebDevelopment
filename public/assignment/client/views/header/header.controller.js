"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService){

        $scope.isLoggedIn = isLoggedIn;
        $scope.logout = logout;

        function isLoggedIn() {
            return ($location.url() != '/home' && $location.url() != '/login' && $location.url() != '/register');
        }

        function logout(user) {

        	delete $rootScope.user;
            UserService.logout().then(function(response){
                if(response) {
                    $location.url("/");
                }
            });

        }

    }

})();