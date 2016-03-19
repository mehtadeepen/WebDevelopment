"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location,UserService) {

        var vm = this;
        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;
        function init() {
            vm.$location = $location;

        }
        init();

        function isLoggedIn() {
            return ($location.url() != '/home' && $location.url() != '/login' && $location.url() != '/register');
        }

        function logout(user) {
            UserService.logout().then(function(response){
                if(response) {
                    $location.url("/");
                }
            });

        }

    }


})();