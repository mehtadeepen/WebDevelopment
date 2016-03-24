"use strict";
(function() {

    angular
        .module("SpiderMongo")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){

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
            UserService.logout(user).then(function(response){
                if(response) {
                    $location.url("/login");
                }
            });
        }

    }

})();