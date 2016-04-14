"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {

        var vm = this;
        function init() {
            vm.$location = $location;
        }
        init();

        vm.login = login;

        function login(username, password) {
            console.log("login... " + username)
            UserService.findUserByCredentials(username, password).then(function(response){
                if(response.data) {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                }
            });
        }


}
})();