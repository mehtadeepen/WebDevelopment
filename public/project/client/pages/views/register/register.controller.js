"use strict";
(function() {
    angular
        .module("SpiderMongo")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        function init() {
            vm.$location = $location;

        }

        init();

        vm.register = register;


        function register(user) {
            console.log(user);
            UserService.findUserByUsername(user.username).then(
                function (response){
                    if (response.data) {
                        console.log("User Already Exists");
                        alert("User Already Exists");
                        return;
                    } else {
                        UserService.createUser(user).then(
                            function(response){
                                if (response.data) {
                                    UserService.setCurrentUser(response.data);
                                    $location.url("/profile");
                                }
                            },function(error){
                                console.log(error);
                            });
                    }
                },function(error){
                    console.log(error);
                });
        }
    }
})();