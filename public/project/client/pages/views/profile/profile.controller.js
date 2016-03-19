"use strict";
(function() {
    angular
        .module("SpiderMongo")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {

        var vm = this;
        function init() {

            vm.$location = $location;

            UserService.getCurrentUser().then(
                function(response){
                    if(response.data){
                        var currentUser = response.data;
                        UserService.findUserByUsername(currentUser.username).then(
                            function(res){
                                if(res.data) {
                                    vm.puser = res.data;
                                    console.log(vm.puser);
                                    console.log(vm.puser);
                                }
                            },function(error){
                                console.log(error);
                            });

                    }
                },function(error){
                    console.log(error);
                });

        }
        init();

        vm.update = update;

        function update(user) {
            console.log("In profile controller :: update ::", user);
            if(!user) {
                return;
            }
            UserService.updateUser(vm.puser.username, user).then(
                function(response) {
                    if(response.data) {
                        UserService.findUserByUsername(vm.puser.username).then(
                            function(res){
                                if(res.data) {
                                    vm.puser = res.data;
                                    UserService.setCurrentUser(res.data);
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