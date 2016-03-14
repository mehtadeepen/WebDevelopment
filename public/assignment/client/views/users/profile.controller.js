"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        var vm = this;
        function init() {

            vm.$location = $location;

            UserService.getCurrentUser().then(function(response){
                if(response.data){
                    var user = response.data;
                    console.log(user);
                    vm.user = user;
                }
            });

        }
        init();
        console.log("IN profilecontroller INIT"+ vm.user);
        console.log(vm.user);
        vm.update = update;

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