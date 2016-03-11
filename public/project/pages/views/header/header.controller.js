"use strict";
(function() {

    angular
        .module("SpiderMongo")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $rootScope){

        console.log("In Header Controller");
        var vm = this;

        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;

        function init() {

            vm.$location = $location;

        }
        init();


        function isLoggedIn() {
            return ($location.url() != '/dashboard' && $location.url() != '/login' && $location.url() != '/register');
        }

        function logout(user) {

        	delete $rootScope.user;
        	$location.url("/")
        }

    }

})();