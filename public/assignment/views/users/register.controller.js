"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(user) {
        	console.log(user);
            UserService.createUser(user, goToProfile);
        }

        function goToProfile(user) {
        	console.log(user);
            if(user != null){
                $rootScope.user = user;
                $location.url("/profile")
            }
        }

    }
})();