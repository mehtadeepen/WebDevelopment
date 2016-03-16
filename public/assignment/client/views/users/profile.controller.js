"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {

        var vm = this;
        function init() {

            vm.$location = $location;

            UserService.getCurrentUser().then(function(response){
                if(response.data){
                    var currentUser = response.data;
                    UserService.findUserByUsername(currentUser.username).then(function(res){
                        if(res.data) {
                            vm.puser = res.data;
                            console.log(vm.puser);
                            console.log("IN profilecontroller INIT"+ vm.puser);
                            console.log(vm.puser);
                        }
                    });

                }
            });

        }
        init();

        vm.update = update;

        function update(user) {
            if(!user) {
                return;
            }
            UserService.updateUser(user._id, user).then(function(response) {
               if(response.data) {
                   UserService.findUserByUsername(vm.puser.username).then(function(res){
                       if(res.data) {
                           vm.puser = res.data;
                           UserService.setCurrentUser(res.data);
                       }
                   });
               }
            });
        }
    }
})();