"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        var vm = this;
        function init() {
            vm.$location = $location;
            vm.user = $rootScope.user;
        }
        init();

        vm.update = update;

        if($rootScope.user === undefined) {
             $location.url("/")
        }

        function update(user) {
            if(!user) {
                return;
            }
            UserService.updateUser(user._id, user).then(function(response) {
               if(response.data) {
                   UserService.findUserByUsername(vm.user.username).then(function(res){
                       if(res.data) {
                           vm.user = res.data;
                           UserService.setCurrentUser(res.data);
                       }
                   });
               }
            });
        }
    }
})();