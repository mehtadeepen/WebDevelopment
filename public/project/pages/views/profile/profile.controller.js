"use strict";
(function() {
    angular
        .module("SpiderMongo")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService) {

        console.log("In Profile Controller");
        var vm = this;

        vm.user = $rootScope.user;
        vm.update = update;
        vm.renderSiderbar = renderSiderbar;

        function init() {

            vm.$location = $location;

        }
        init();


        if($rootScope.user === undefined) {
             $location.url("/")
        }


        function update(user) {

            UserService.updateUser(user._id, user, function(updatedUser) {
                $rootScope.user = updatedUser;
                console.log(updatedUser);
                $location.url('/dashboard');
            });

        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }
    }
})();