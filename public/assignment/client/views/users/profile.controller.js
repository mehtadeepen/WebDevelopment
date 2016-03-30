"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService, AlertService) {

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
                                    console.log("IN profilecontroller INIT"+ vm.puser);
                                    console.log(vm.puser);
                                }
                            }, function (error) {
                                console.log(error);
                            });

                    } else {
                        $location.url("/login");
                    }
                }, function (error) {
                    console.log(error);
                });

        }
        init();

        vm.update = update;

        function update(user) {
            if(!user) {
                return;
            }
            console.log("Updating ......",user);
            UserService.getCurrentUser().then(
                function(response){
                    if(response.data){
                        UserService.updateUser(user._id, user).then(
                            function(response) {
                            if(response.data) {
                                UserService.findUserByUsername(vm.puser.username).then(function(res){
                                    if(res.data) {
                                        vm.puser = res.data;
                                        UserService.setCurrentUser(res.data);
                                        AlertService.alertSuccess("Profile","Updated Successfully");
                                    }
                                });
                            }
                        }, function (error) {
                                AlertService.displayUserFormError(error.data.errors);
                            });
                    } else {
                        $location.url("/login");
                    }
                }, function (error) {
                    console.log(error);
                });
        }
    }
})();