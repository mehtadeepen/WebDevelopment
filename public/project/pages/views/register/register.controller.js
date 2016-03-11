"use strict";
(function() {
    angular
        .module("SpiderMongo")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        console.log("In Regsiter Controller");
        var vm = this;
        vm.register = register;

        function init() {

            vm.$location = $location;

        }

        init();

        function register(user) {

            if(user == undefined || user.username == undefined || !user.hasOwnProperty("username") || user.username.trim() === "") {
                return;
            }
            console.log(user);
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                console.log(user);
                UserService.createUser(user, goToProfile);
            } else {

                console.log("User Already Exists");
                alert("User Already Exists");
            }
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