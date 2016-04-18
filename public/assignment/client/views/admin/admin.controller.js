"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, AdminService, UserService, AlertService, sweet) {

        var vm = this;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.resetForm = resetForm;
        vm.updateUser = updateUser;

        function init() {
            vm.$location = $location;
            vm.showPlus = true;
            vm.showCross = false;
            vm.showTick = false;
            vm.doDisable = false;

            findAllUsers();
            }
            init();

        function findAllUsers() {
            AdminService.findAllUsersForAdmin().then(
                function (response) {
                    console.log(response.data);
                    vm.users = response.data;
                }, function (error) {
                    console.log(error);
                }
            );
        }

        vm.arrayToString = function(string){
            return string.join(",");
        };

        function deleteUser(userId) {
            console.log(userId);
            AdminService.deleteUserByAdmin(userId).then(
                function (response) {
                    console.log(response);
                    if(response) {
                        vm.users = response.data;
                        vm.user ={};
                        vm.showPlus = true;
                        vm.showCross = false;
                        vm.showTick = false;
                        vm.doDisable = false;
                    }
                }, function (error) {
                    console.log("error");
                }
            );
        }

        function createUser (user) {
            if(!user) return;
            if(user.username.trim() === "") return;
            UserService.findUserByUsername(user.username).then(
                function (response) {
                    if(response) {
                        console.log("User Already Exists");
                        AlertService.alertError("Username","User Already Exists");
                        return;
                    } else {
                        AdminService.createUser(user).then(
                            function (response) {
                                console.log(response);
                                if(response.data) {
                                    findAllUsers();
                                    vm.user ={};
                                    vm.showPlus = true;
                                    vm.showCross = false;
                                    vm.showTick = false;
                                    vm.doDisable = false;
                                }
                            }, function (error) {
                                console.log(error);
                            }
                        );
                    }

                }, function (error) {

                });
        }

        function selectUser(user) {
            var selectedUser = angular.copy(user);
            vm.user = selectedUser;
            vm.showPlus = false;
            vm.showCross = true;
            vm.showTick = true;
            vm.doDisable = true;
        }

        function updateUser(userId,newUser) {
            console.log(userId,newUser);
            AdminService.updateUserByAdmin(userId,newUser).then(
                function (response) {
                    vm.users = response.data;
                    vm.user = {};
                    vm.showPlus = true;
                    vm.showCross = false;
                    vm.showTick = false;
                    vm.doDisable = false;
                }, function (error) {

                }
            );

        }

        function resetForm() {

            vm.user = {};
            vm.showPlus = true;
            vm.showCross = false;
            vm.showTick = false;
        }

        vm.predicate = 'username';
        vm.reverse = true;
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

    }


})();