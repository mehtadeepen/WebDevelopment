"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, AlertService) {

        var vm = this;

        function init() {
            vm.$location = $location;

        }

        init();

        vm.register = register;


        function register(user) {
            if(!user) return;
            if(user.username.trim() === "") return;
            UserService.findUserByUsername(user.username).then(function (response) {
                if (response.data) {
                    console.log("User Already Exists");
                    AlertService.alertError("Username","User Already Exists");
                    return;
                } else {
                    UserService.createUser(user).then(
                        function (response) {
                            if (response.data) {
                                UserService.setCurrentUser(response.data);
                                AlertService.alertSuccess("Welcome","Registration Successful");
                                $location.url("/profile");
                            }
                        }, function (error) {
                            AlertService.displayUserFormError(error.data.errors);
                        }
                    );
                }
            });
        }

    }
})();